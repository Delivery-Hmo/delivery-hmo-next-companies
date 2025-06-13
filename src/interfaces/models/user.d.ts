import { Roles } from "../types/user";

export interface User {
  readonly id?: number;
  uid: string;
  readonly role: Roles;
  name: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  description: string;
  active: boolean;
  image: string;
  phone: string;
}