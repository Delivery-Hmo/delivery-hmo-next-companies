"use server";

import { BaseUrl } from "@src/types/services/http";

export const logoUrl = "https://firebasestorage.googleapis.com/v0/b/delivery-hmo.appspot.com/o/logos%2FWhatsApp%20Image%202025-06-18%20at%209.26.42%20PM.jpeg?alt=media&token=b62808ce-c34b-4e45-96f2-4a188ac1033f";
export const logoUrlTransparent = "https://firebasestorage.googleapis.com/v0/b/delivery-hmo.appspot.com/o/logos%2FWhatsApp_Image_2025-06-18_at_9.29.17_PM-removebg-preview.png?alt=media&token=942863cf-9f51-4211-acd9-852805b1332e";

export const filterKeys = ["page", "limit", "id", "name", "email", "phone"];

export const baseUrlsApis: Record<BaseUrl, string> = {
  "companiesApi": "http://localhost:3001",
  "refreshTokenApi": "https://securetoken.googleapis.com/v1",
  "firebaseAuthApi": "https://identitytoolkit.googleapis.com/v1/accounts:"
} as const;
