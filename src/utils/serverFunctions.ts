import { User } from "@src/interfaces/models/user";
import { Url } from "@src/types/navigation";
import { getCookie } from "cookies-next/server";
import { cookies } from "next/headers";
import { redirect as redirectNext } from "next/navigation";

export const parseUser = async (userCookie?: string) => {
  if (!userCookie) return null;

  try {
    return JSON.parse(userCookie) as User;
  } catch (_) {
    return null;
  }
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

export const redirect = (url: Url) => redirectNext(url);

export const getValuesFormData = <T>(formData: FormData) => {
  let values: T = {} as T;

  formData.forEach((value, key) => {
    values[key as keyof T] = value.toString() as T[keyof T];
  });

  return values;
};