import { useEffect, useContext, createContext, ReactNode, useState, UIEvent, useCallback, Dispatch, SetStateAction } from "react";
import { Form, FormInstance, UploadFile } from "antd";
import useAbortController from "../../hooks/useAbortController";
import { once } from "../../utils/functions";
import { ItemSelect } from "@src/interfaces/components/dynamicForm";
import { usePathname } from "next/navigation";
import useMessage from "@src/hooks/useMessage";
import { FormControlType } from "@src/types/components/clientComponents/dynamicForm";

interface Props<T> {
  children: ReactNode;
  inputsProp?: FormControlType<T>[];
  isFiltersTable?: boolean;
  url?: string;
  withOutToken?: boolean;
  onSuccess?: (values: T) => Promise<void>;
  openProp?: boolean;
  requestFun?: (values: T, form: FormInstance<T>) => Promise<void>;
}

type OnPopupScrollFun<T> = (e: UIEvent<HTMLDivElement, globalThis.UIEvent>, item: ItemSelect<keyof T>) => Promise<void>;

interface Context<T> {
  inputs: FormControlType<T>[];
  onPopupScroll: OnPopupScrollFun<T>;
  onSearchSelect: (search: string) => void;
  form: FormInstance<T>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  saving: boolean;
  setSaving: Dispatch<SetStateAction<boolean>>;
  onFinish: (values: T) => Promise<void>;
  fileList?: UploadFile[];
  setFileList?: Dispatch<SetStateAction<UploadFile[]>>;
}

const createStateContext = once(<T extends {}>() => createContext({
  inputs: [],
  onPopupScroll: () => Promise.resolve(),
  onSearchSelect: (_: string) => { },
  form: {} as FormInstance<T>,
  open: false,
  setOpen: () => false,
  saving: false,
  setSaving: () => false,
  onFinish: () => Promise.resolve(),
} as Context<T>));

export const useDynamicForm = <T extends {}>() => useContext(createStateContext<T>());

const DynamicFormProvider = <T extends { id?: number; }>({ children, inputsProp, isFiltersTable, url, withOutToken, onSuccess, openProp, requestFun }: Props<T>) => {
  const [form] = Form.useForm<T>();
  const message = useMessage();
  const pathname = usePathname();
  const Context = createStateContext<T>();
  const abortController = useAbortController();
  const [inputs, setInputs] = useState<FormControlType<T>[]>([]);
  const [notLoadMore, setNotLoadMore] = useState(false);
  const [filtersTabledLoaded, setFiltersTabledLoaded] = useState(false);
  const [open, setOpen] = useState(openProp || false);
  const [saving, setSaving] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const init = useCallback(async () => {
    if (!inputsProp?.length || inputsProp.some(i => i.type === "select" && i.loading)) return;

    try {
      setNotLoadMore(false);

      const newItems = await Promise.all(inputsProp!.map(async input => {
        if (input.type !== "select" || !input.url) return input;

        /*  const response = await get<SelectGet>({
           //esto podria ser mas dinamico
           baseUrl: "todoConstructionLLCApi",
           url: input.url,
           abortController: abortController.current!
         });
  */
        input.loading = false;
        input.page = 1;
        //input.options = response.list.map((r) => ({ value: r.id, label: `${r.name || ""} ${r.email ? " - " + r.email : ""}` }));

        return input;
      }));

      setInputs(newItems);
    } catch (error) {
      console.log(error);
      message.error("Error al obtener los filtros de listas.");
    }
  }, [inputsProp, message]);

  useEffect(() => {
    if (!isFiltersTable || filtersTabledLoaded) return;

    init();
    setFiltersTabledLoaded(true);
  }, [init, isFiltersTable, filtersTabledLoaded]);

  useEffect(() => {
    if (!open) return;

    init();
  }, [open, init]);

  const onPopupScroll = async (e: UIEvent<HTMLDivElement, globalThis.UIEvent>, item: ItemSelect<keyof T>) => {
    if (notLoadMore) return;

    const selectItems = inputs.filter(i => i.type === "select") as ItemSelect<keyof T>[];

    if (selectItems.some(i => i.loading)) return;

    const target = e.target as HTMLDivElement;
    const { url, page } = item;

    if (target.scrollTop + target.offsetHeight !== target.scrollHeight) return;

    setInputs(prev => prev.map(i => {
      const parseItem = i as ItemSelect<keyof T>;

      if (parseItem.id !== item.id) return parseItem;

      parseItem.loading = true;

      return parseItem;
    }));

    try {
      const path = url?.split("?")[0];
      /*  const response = await get<SelectGet>({
         baseUrl: "todoConstructionLLCApi",
         url: `${path}?page=${page! + 1}&limit=10`,
         abortController: abortController.current!
       });
 
       if (response.list.length !== 10) {
         setNotLoadMore(true);
       } 
 
       setInputs(inputs.map(i => {
         const parseItem = i as ItemSelect<keyof T>;
 
         if (parseItem.id !== item.id) return parseItem;
 
         parseItem.options = [...parseItem.options || [], ...response.list.map((r) => ({ value: r.id, label: `${r.name || ""} ${r.email ? " - " + r.email : ""}` }))];
         parseItem.page = page! + 1;
 
         return parseItem;
       }));*/
    } catch (error) {
      console.log(error);
      message.error("Error al obtener más resultados.");
    } finally {
      setInputs(prev => prev.map(i => {
        const parseItem = i as ItemSelect<keyof T>;

        if (parseItem.id !== item.id) return parseItem;

        parseItem.loading = false;

        return parseItem;
      }));
    }
  };

  const onSearchSelect = async (search: string) => {
    console.log("searchValue ---->", search);
  };

  const onFinish = async (values: T) => {
    const _values = values as T & { password?: string; confirmPassword?: string; email?: string; };
    const { password, confirmPassword } = _values;

    if (password && confirmPassword && password !== confirmPassword) {
      message.error("Error, Las contraseñas no coinciden.");
      return;
    }

    setSaving(true);

    const imagesBase64 = fileList?.length ? fileList?.map(i => i.thumbUrl || "") : [];

    if (imagesBase64.length) {
      values = { ...values, images: imagesBase64 };
    }

    const { id } = values;
    let urlEndpoint = url || `${pathname}/${id ? "update" : "create"}`;

    try {
      if (requestFun) {
        await requestFun(values, form);
      } /* else {
        id
          ? await put({
            baseUrl: "todoConstructionLLCApi",
            url: urlEndpoint,
            body: values,
            abortController: abortController.current,
            withOutToken
          }) : await post({
            baseUrl: "todoConstructionLLCApi",
            url: urlEndpoint,
            body: values,
            abortController: abortController.current,
            withOutToken
          });
      } */

      setFileList([]);

      await onSuccess?.(values);
    } catch (error) {
      console.log(error);

      if (typeof error === "string") {
        message.error(error);
        return;
      }

      if (typeof error === "object" && error && "error" in error && typeof error.error === "string") {
        message.error(error.error);
        return;
      }

      if (error instanceof Error) {
        message.error(error.message);
        return;
      }

      message.error("An error occurred while saving the record.");
    } finally {
      setSaving(false);
    }
  };

  return <Context.Provider
    value={{
      inputs,
      onPopupScroll,
      onSearchSelect,
      form,
      open,
      setOpen,
      saving,
      setSaving,
      onFinish,
      fileList,
      setFileList
    }}
  >
    {children}
  </Context.Provider>;
};

export default DynamicFormProvider;
