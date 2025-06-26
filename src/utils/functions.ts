import { Url } from "@src/types/navigation";
import { redirect as redirectNext } from "next/navigation";

export const getHeaders = (token: string) => {
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

export const handleError = (error: any) => {
  console.log(error);

  if (error.message && typeof error.message === "string") {
    throw new Error(error.message);
  }

  if (error instanceof Error) {
    throw new Error(error.message);
  }

  throw new Error(JSON.stringify(error));
};

export const once = <T extends (...args: any[]) => any>(fn: T): T => {
  let called = false;
  let result: ReturnType<T> | undefined;

  const wrappedFn: (...args: Parameters<T>) => ReturnType<T> = (...args) => {
    if (!called) {
      result = fn(...args);
      called = true;
    }
    return result as ReturnType<T>;
  };

  return wrappedFn as T;
};

export const redirect = (url: Url) => redirectNext(url);