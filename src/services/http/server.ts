"use server";

import { getCookie, getCookies } from "cookies-next";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { GetProps, PostPutPatch, ResponseError } from "@src/interfaces/services/http";
import { getHeaders } from "@src/utils/serverFunctions";
import { baseUrlsApis, filterKeys } from "@src/utils/constants";

export const get = async <T>({ baseUrl, url, abortController }: GetProps) => {
  const token = await getCookie("token", { cookies }) as string;
  const allCookies = await getCookies({ cookies });

  const cookieEntries = allCookies ? Object.entries(allCookies).filter(([key, value]) => value && filterKeys.includes(key)) : [];

  for (let i = 0; i < cookieEntries.length; i++) {
    const [key, value] = cookieEntries[i];

    if (i === 0) {
      url += `?${key}=${value}`;
      continue;
    }

    url += `&${key}=${value}`;
  }

  const response = await fetch(
    `${baseUrlsApis[baseUrl]}${url}`,
    {
      method: "GET",
      headers: await getHeaders(token),
      signal: abortController?.signal
    }
  );

  if (!response.ok) {
    const { error, message } = await response.json() as ResponseError;

    return new Error(message || error?.message || "Error al realizar la petición.");
  }

  const json = await response.json() as T;

  return json;
};

export const post = async <T>(props: PostPutPatch) => postPutPatch<T>({ ...props, method: "POST" });

export const put = async <T>(props: PostPutPatch) => postPutPatch<T>({ ...props, method: "PUT" });

export const patch = async <T>(props: PostPutPatch) => postPutPatch<T>({ ...props, method: "PATCH" });

export const postPutPatch = async <T>(
  {
    baseUrl,
    url,
    body,
    method,
    abortController,
    pathToRevalidate,
    headers
  }: PostPutPatch & { method: "POST" | "PUT" | "PATCH"; }
) => {
  const completeUrl = `${baseUrlsApis[baseUrl]}${url}`;
  const token = await getCookie("token", { cookies }) as string;
  const response = await fetch(
    completeUrl,
    {
      method,
      body: body instanceof URLSearchParams ? body : JSON.stringify(body),
      headers: headers || await getHeaders(token),
      signal: abortController?.signal,
    }
  );

  if (!response.ok) {
    const { error, message } = await response.json() as ResponseError;

    return new Error(message || error?.message || "Error al realizar la petición.");
  }

  if (pathToRevalidate) revalidateTag(pathToRevalidate);

  return response.json() as Promise<T>;
};
