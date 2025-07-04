import { DatePicker, Input, InputNumber, Select, Switch, Upload, UploadFile } from "antd";
import FormItem, { FormItemProps } from "antd/es/form/FormItem";
import { NamePath } from "antd/es/form/interface";
import { FormControlType } from "@src/types/components/clientComponents/dynamicForm";
import ButtonUpload from "@src/components/clientComponents/buttonUpload";
import { valueType } from "antd/es/statistic/utils";

export interface PropsItemFilters<T> {
  formControl: FormControlType<T>;
  fileListImage?: UploadFile[];
}

const FormControl = <T extends {}>({ formControl, fileListImage }: PropsItemFilters<T>) => {
  const { name, type, label, style, placeholder, disabled } = formControl;

  const baseFormItemProps: FormItemProps<T> = {
    name: name as NamePath<T>,
    label,
  };

  return (
    <>
      {
        (!type || type === "input") && <Input
          name={name as NamePath}
          style={style}
          placeholder={placeholder}
          disabled={disabled}
          required={formControl.required}
          defaultValue={formControl.defaultValue}
        />
      }
      {
        type === "number" && <InputNumber
          name={name as NamePath}
          style={{ width: "100%" }}
          type="number"
          disabled={disabled}
          max={formControl.max}
          min={formControl.min}
          required={formControl.required}
          defaultValue={formControl.defaultValue as valueType}
        />
      }
      {
        type === "price" && <InputNumber<number>
          name={name as NamePath}
          style={{ width: "100%" }}
          min={1}
          max={999_999}
          disabled={disabled}
          required={formControl.required}
          defaultValue={formControl.defaultValue as number | undefined}
        />
      }
      {
        type === "email" && <Input
          name={name as NamePath}
          type="email"
          style={style}
          placeholder={placeholder}
          disabled={disabled}
          required={formControl.required}
          defaultValue={formControl.defaultValue}
        />
      }
      {
        type === "phone" && <Input
          name={name as NamePath}
          type="number"
          disabled={disabled}
          required={formControl.required}
          defaultValue={formControl.defaultValue}
        />
      }
      {
        type === "password" && <Input
          name={name as NamePath}
          type="password"
          style={style}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete="new-password"
          required={formControl.required}
          defaultValue={formControl.defaultValue}
        />
      }
      {
        type === "textarea" && <Input.TextArea
          name={name as NamePath}
          style={style}
          placeholder={placeholder}
          disabled={disabled}
          required={formControl.required}
          defaultValue={formControl.defaultValue}
        />
      }
      {
        type === "select" && <Select
          style={style}
          options={formControl.options}
          loading={formControl.loading}
          placeholder={placeholder}
          allowClear={true}
          disabled={disabled}
          mode={formControl.mode}
          defaultValue={formControl.defaultValue}
        />
      }
      {
        type === "switch" && <Switch
          disabled={disabled}
          defaultValue={formControl.defaultValue}
        />
      }
      {
        type === "image" && <Upload
          name={name as NamePath}
          fileList={fileListImage}
          accept="image/png, image/jpeg"
          listType="picture-card"
          multiple
          maxCount={5}
        >
          <ButtonUpload
            value={fileListImage || []}
          />
        </Upload>
      }
      {
        type === "dataRange" && <DatePicker.RangePicker
          name={name as NamePath}
          showTime={formControl.showTime}
          required={formControl.required}
        />
      }
      {
        type === "dataTime" && <DatePicker
          name={name as NamePath}
          style={{ width: "100%" }}
          showTime={formControl.showTime}
          minDate={formControl.minDate}
          required={formControl.required}
        />
      }
    </>
  );
};

export default FormControl;