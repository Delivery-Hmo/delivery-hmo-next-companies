"use server";

import { User } from "@src/interfaces/models/user";
import { FirebaseAuth, FirebaseTokenData } from "@src/interfaces/services/firebaseAuth";
import { getCookie } from "cookies-next/server";
import { cookies } from "next/headers";

export const getHeaders = async (token: string) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };

  if (!token) {
    return headers;
  }

  return {
    ...headers,
    Authorization: "Bearer " + token
  };
};

export const parseUser = async (userCookie?: string) => {
  if (!userCookie) return null;

  try {
    return JSON.parse(userCookie) as User;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const parseFirebaseAuth = async (userCookie?: string) => {
  if (!userCookie) return null;

  try {
    return JSON.parse(userCookie) as FirebaseAuth;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const parseFirebaseTokenData = async (token?: string) => {
  try {
    if (!token) return null;

    const payload = token.split('.')[1];
    const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));

    return JSON.parse(json) as FirebaseTokenData;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const verifyTokenExpired = async (exp: number) => {
  const nowInSeconds = Math.floor(Date.now() / 1000);

  return exp < nowInSeconds;
};

export const getUserByCookie = async (userCookie?: string) => {
  const _userCookie = userCookie || (await getCookie("user", { cookies })) || "";

  if (!_userCookie) return null;

  try {
    return JSON.parse(_userCookie) as User;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getValuesFormData = async <T>(formData: FormData) => {
  let values: T = {} as T;

  formData.forEach((value, key) => {
    values[key as keyof T] = value.toString() as T[keyof T];
  });

  return values;
};