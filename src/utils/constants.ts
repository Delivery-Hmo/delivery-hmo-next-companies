import { FormRule } from "antd";
import { BaseUrl } from "@src/types/services/http";

export const firstPage = "?page=1&limit=10";

export const logoUrl = "https://firebasestorage.googleapis.com/v0/b/delivery-hmo.appspot.com/o/logos%2FWhatsApp%20Image%202025-06-18%20at%209.26.42%20PM.jpeg?alt=media&token=b62808ce-c34b-4e45-96f2-4a188ac1033f";
export const logoUrlTransparent = "https://firebasestorage.googleapis.com/v0/b/delivery-hmo.appspot.com/o/logos%2FWhatsApp_Image_2025-06-18_at_9.29.17_PM-removebg-preview.png?alt=media&token=942863cf-9f51-4211-acd9-852805b1332e";
export const homeImage = "https://firebasestorage.googleapis.com/v0/b/house-construction-3fca4.firebasestorage.app/o/assets%2Frir-remodeling-on-a-budget.webp?alt=media&token=81d94953-e5d0-446f-96b1-a5c23ff9d069";

export const filterKeys = ["page", "limit", "id", "name", "email", "phone"];

export const allUrlParamKeys = [...filterKeys, "pathname"] as const;

export const baseUrlsApis: Record<BaseUrl, string> = {
  "companiesApi": "http://localhost:3001",
  "refreshTokenApi": "https://securetoken.googleapis.com/v1"
} as const;

export const publicRoutes = [
  "/",
  "/iniciar-sesion",
  "/registrarse",
];

export const superAdminRoutes = [
  "/home",
  "/users",
  "/schedules",
  "/services",
  "/sales-details",
  "/sales"
];

export const ruleName: FormRule = {
  required: true,
  message: 'El nombre es requerido.',
  validator: (rule, value?: string) => {
    return !value?.length ? Promise.reject(rule.message) : Promise.resolve();
  },
} as const;

export const rulePhone: FormRule = {
  required: true,
  message: 'El número telefónico tiene que ser de 10 dígitos.',
  validator: (rule, value?: string) => value?.length !== 10 ? Promise.reject(rule.message) : Promise.resolve(),
} as const;

export const rulePrice: FormRule = {
  required: true,
  message: 'El precio no puede ser menor a 0.01 o mayor a 999,999.',
  validator: (rule, value?: string) => {
    if (!value) return Promise.reject(rule.message);

    const numberValue = +value;

    if (numberValue < 0.01 || numberValue > 999999) return Promise.reject(rule.message);

    return Promise.resolve();
  },
} as const;

export const ruleMaxLength: FormRule = {
  max: 255,
  message: "El texto no puede tener más de 300 caracteres.",
  type: "string"
} as const;

export const ruleLargeMaxLength: FormRule = {
  max: 3000,
  message: "El texto no puede tener más de 300 caracteres."
} as const;

export const ruleEmail: FormRule = {
  required: true,
  message: 'Favor de escribir un correo electrónico válido.',
  type: "email"
} as const;

export const rulePasswordRequired: FormRule = {
  required: true,
  message: 'La contraseña es requerida.'
} as const;

export const rulePassword: FormRule = {
  required: true,
  min: 6,
  message: 'La contraseña tiene que ser de 6 dígitos o más.'
} as const;