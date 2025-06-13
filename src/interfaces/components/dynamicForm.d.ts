import { InputNumberProps, InputProps, PopoverProps, SelectProps, SwitchProps, TagProps, UploadProps } from "antd";
import { RangePickerProps, DatePickerProps } from "antd/es/date-picker";
import { Rule } from "antd/es/form";
import { DefaultOptionType } from "antd/es/select";
import { ReactNode } from "react";

interface BaseInputProps<K> {
  name: K;
  label?: ReactNode;
  rules?: Rule[];
  placeholder?: string;
  md?: number;
  showTag?: boolean;
  tagProps?: TagProps;
}

export interface ItemInput<K> extends Omit<InputProps, "name">, BaseInputProps<K> {
  type?: "input";
}

export interface ItemNumber<K> extends Omit<ItemInput<K>, "type"> {
  type: "number";
}

export interface ItemPrice<K> extends Omit<InputNumberProps, "name">, BaseInputProps<K> {
  type: "price";
}

export interface ItemEmail<K> extends Omit<ItemInput<K>, "type"> {
  type: "email";
}

export interface ItemSelect<K> extends Omit<SelectProps, "name" | "onChange" | "placeholder">, BaseInputProps<K> {
  type: "select";
  keyValue?: string;
  keyLabel?: string;
  url?: string;
  page?: number;
  onChange?: ({ title, value }: DefaultOptionType) => void;
}

export interface ItemPassword<K> extends Omit<ItemInput<K>, "type"> {
  type: "password";
}

export interface ItemPhone<K> extends Omit<ItemInput<K>, "type"> {
  type: "phone";
}

export interface ItemTextarea<K> extends Omit<ItemInput<K>, "type"> {
  type: "textarea";
}

export interface ItemSwitch<K> extends SwitchProps, BaseInputProps<K> {
  type: "switch";
}

export interface ItemImage<K> extends Omit<UploadProps, "name" | "type">, BaseInputProps<K> {
  type: "image";
}

export interface ItemDateRange<K> extends Omit<RangePickerProps, "name" | "placeholder">, BaseInputProps<K> {
  type: "dataRange";
}

export interface ItemDateTime<K> extends Omit<DatePickerProps, "name" | "placeholder">, BaseInputProps<K> {
  type: "dataTime";
}

export interface SelectGet {
  list: SelectResponse[];
  total: number;
}

export interface SelectResponse {
  id: string;
  name?: string;
  email?: string;
}