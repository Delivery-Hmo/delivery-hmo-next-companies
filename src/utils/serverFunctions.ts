import { User } from "@src/interfaces/models/user";
import { getCookie } from "cookies-next/server";
import { cookies } from "next/headers";

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