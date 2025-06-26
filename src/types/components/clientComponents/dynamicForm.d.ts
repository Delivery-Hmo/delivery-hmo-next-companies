import {
  ItemInput,
  ItemPassword,
  ItemPhone,
  ItemSelect,
  ItemTextarea,
  ItemSwitch,
  ItemNumber,
  ItemEmail,
  ItemPrice,
  ItemImage,
  ItemDateRange,
  ItemDateTime,
} from "@src/interfaces/components/dynamicForm";
import { FormItemProps } from "antd/es/form/FormItem";

export type FormControlType<T> = (ItemInput<keyof T>
  | ItemSelect<keyof T>
  | ItemPassword<keyof T>
  | ItemPhone<keyof T>
  | ItemTextarea<keyof T>
  | ItemSwitch<keyof T>
  | ItemNumber<keyof T>
  | ItemEmail<keyof T>
  | ItemPrice<keyof T>
  | ItemImage<keyof T>
  | ItemDateRange<keyof T>
  | ItemDateTime<keyof T>) & { formItemProps?: FormItemProps<T>; };