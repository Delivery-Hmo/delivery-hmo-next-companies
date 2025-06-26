import { FormControlType } from "@src/types/components/clientComponents/dynamicForm";
import FormControl from "../formControl";

interface Props<T> {
  formId: string;
  action: (formData: FormData) => Promise<void>;
  formControls: FormControlType<T>[];
}

const DynamicForm = <T extends {}>({ formId, action, formControls }: Props<T>) => {
  return (
    <form
      id={formId}
      action={action}
      autoComplete="off"
    >
      {
        formControls.map((formControl) =>
          <FormControl
            key={formControl.name.toString()}
            formControl={formControl}
          />
        )
      }
    </form>
  );
};

export default DynamicForm;