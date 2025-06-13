import { FormRule } from "antd";
import { BaseUrl } from "@src/types/services/http";

export const firstPage = "?page=1&limit=10";

export const logoUrl = "https://firebasestorage.googleapis.com/v0/b/connect-4dee9.appspot.com/o/test%2FTODO%20CONSTRUCTION%20LLC%20(1).jpg?alt=media&token=d1f55b21-ea66-4ccc-830c-418cc2f16ae3";
export const logoLicensed = "https://firebasestorage.googleapis.com/v0/b/house-construction-3fca4.firebasestorage.app/o/assets%2FWhatsApp%20Image%202025-05-26%20at%208.46.38%20PM.jpeg?alt=media&token=fa5a40ef-755a-49e7-a44d-640e554cc16a";
export const homeImage = "https://firebasestorage.googleapis.com/v0/b/house-construction-3fca4.firebasestorage.app/o/assets%2Frir-remodeling-on-a-budget.webp?alt=media&token=81d94953-e5d0-446f-96b1-a5c23ff9d069";

export const filterKeys = ["page", "limit", "id", "name", "email", "phone"];

export const allUrlParamKeys = [...filterKeys, "pathname"] as const;

export const baseUrlsApis: Record<BaseUrl, string> = {
  "companiesApi": "http://localhost:3001",
  "refreshTokenApi": "https://securetoken.googleapis.com/v1"
} as const;

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
  message: "Name is required.",
  validator: (rule, value?: string) => {
    return !value?.length ? Promise.reject(rule.message) : Promise.resolve();
  },
} as const;

export const rulePhone: FormRule = {
  required: true,
  message: "The phone number must be 10 digits long.",
  validator: (rule, value?: string) => value?.length !== 10 ? Promise.reject(rule.message) : Promise.resolve(),
} as const;

export const rulePrice: FormRule = {
  required: true,
  message: "The price must be between 0.01 and 999,999.",
  validator: (rule, value?: string) => {
    if (!value) return Promise.reject(rule.message);

    const numberValue = +value;

    if (numberValue < 0.01 || numberValue > 999999) return Promise.reject(rule.message);

    return Promise.resolve();
  },
} as const;

export const ruleMaxLength: FormRule = {
  max: 255,
  message: "The text cannot exceed 300 characters.",
  type: "string"
} as const;

export const ruleLargeMaxLength: FormRule = {
  max: 3000,
  message: "The text cannot exceed 300 characters."
} as const;

export const ruleEmail: FormRule = {
  required: true,
  message: "Please enter a valid email address.",
  type: "email"
} as const;

export const rulePassword: FormRule = {
  required: true,
  min: 6,
  message: "Password must be at least 6 characters long."
} as const;