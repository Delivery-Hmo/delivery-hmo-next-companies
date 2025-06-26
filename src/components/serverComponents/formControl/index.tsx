import { DatePicker, Input, InputNumber, Select, Switch, Upload, UploadFile } from "antd";
import FormItem, { FormItemProps } from "antd/es/form/FormItem";
import { NamePath } from "antd/es/form/interface";
import { FormControlType } from "@src/types/components/clientComponents/dynamicForm";
import ButtonUpload from "@src/components/clientComponents/buttonUpload";

export interface PropsItemFilters<T> {
  formControl: FormControlType<T>;
  fileListImage?: UploadFile[];
}

const FormControl = <T extends {}>({ formControl, fileListImage }: PropsItemFilters<T>) => {
  const { name, type, label, style, placeholder, disabled, formItemProps } = formControl;

  const baseFormItemProps: FormItemProps<T> = {
    name: name as NamePath<T>,
    label,
  };

  return (
    <>
      {
        (!type || type === "input") && <FormItem
          {...baseFormItemProps}
          {...formItemProps}
        >
          <Input
            name={name as NamePath}
            style={style}
            placeholder={placeholder}
            disabled={disabled}
            required={formControl.required}
          />
        </FormItem>
      }
      {
        type === "number" && <FormItem
          {...baseFormItemProps}
          {...formItemProps}
        >
          <InputNumber
            name={name as NamePath}
            style={{ width: "100%" }}
            type="number"
            disabled={disabled}
            max={formControl.max}
            min={formControl.min}
            required={formControl.required}
          />
        </FormItem>
      }
      {
        type === "price" && <FormItem
          {...baseFormItemProps}
          {...formItemProps}
        >
          <InputNumber<number>
            name={name as NamePath}
            style={{ width: "100%" }}
            min={1}
            max={999_999}
            disabled={disabled}
            required={formControl.required}
          />
        </FormItem>
      }
      {
        type === "email" && <FormItem
          {...baseFormItemProps}
          {...formItemProps}
        >
          <Input
            name={name as NamePath}
            type="email"
            style={style}
            placeholder={placeholder}
            disabled={disabled}
            required={formControl.required}
          />
        </FormItem>
      }
      {
        type === "phone" && <FormItem
          {...baseFormItemProps}
          {...formItemProps}
        >
          {JSON.stringify(formItemProps)}
          <Input
            name={name as NamePath}
            type="number"
            disabled={disabled}
            required={formControl.required}
          />
        </FormItem>
      }
      {
        type === "password" && <FormItem
          {...baseFormItemProps}
          {...formItemProps}
        >
          <Input
            name={name as NamePath}
            type="password"
            style={style}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete="new-password"
            required={formControl.required}
          />
        </FormItem>
      }
      {
        type === "textarea" && <FormItem
          {...baseFormItemProps}
          {...formItemProps}
        >
          <Input.TextArea
            name={name as NamePath}
            style={style}
            placeholder={placeholder}
            disabled={disabled}
            required={formControl.required}
          />
        </FormItem>
      }
      {
        type === "select" && <FormItem
          {...baseFormItemProps}
          {...formItemProps}
        >
          <Select
            style={style}
            options={formControl.options}
            loading={formControl.loading}
            placeholder={placeholder}
            allowClear={true}
            disabled={disabled}
            mode={formControl.mode}
          />
        </FormItem>
      }
      {
        type === "switch" && <FormItem
          {...baseFormItemProps}
          {...formItemProps}
          valuePropName="checked"
        >
          <Switch
            disabled={disabled}
          />
        </FormItem>
      }
      {
        type === "image" && <FormItem
          {...baseFormItemProps}
          {...formItemProps}
        >
          <Upload
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
        </FormItem >
      }
      {
        type === "dataRange" && <FormItem
          {...baseFormItemProps}
          {...formItemProps}
        >
          <DatePicker.RangePicker
            name={name as NamePath}
            showTime={formControl.showTime}
            required={formControl.required}
          />
        </FormItem>
      }
      {
        type === "dataTime" && <FormItem
          {...baseFormItemProps}
          {...formItemProps}
        >
          <DatePicker
            name={name as NamePath}
            style={{ width: "100%" }}
            showTime={formControl.showTime}
            minDate={formControl.minDate}
            required={formControl.required}
          />
        </FormItem>
      }
    </>
  );
};

export default FormControl;