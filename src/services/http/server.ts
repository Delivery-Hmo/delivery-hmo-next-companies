"use server";

import { getCookie, getCookies } from "cookies-next";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { GetProps, PostPutPatch } from "@src/interfaces/services/http";
import { getHeaders, handleError } from "@src/utils/serverFunctions";
import { baseUrlsApis, filterKeys } from "@src/utils/serverConstants";

export const get = async <T>({ baseUrl, url, abortController }: GetProps) => {
  try {
    const token = getCookie("token", { cookies }) as string;
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
        headers: getHeaders(token),
        signal: abortController?.signal
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw handleError(error);
    }

    const json = await response.json() as T;

    return json;
  } catch (error) {
    throw handleError(error);
  }
};

export const post = async <T>(props: PostPutPatch) => postPutPatch<T>({ ...props, method: "POST" });

export const put = async <T>(props: PostPutPatch) => postPutPatch<T>({ ...props, method: "PUT" });

export const patch = async <T>(props: PostPutPatch) => postPutPatch<T>({ ...props, method: "PATCH" });

export const postPutPatch = async <T>(
  {
    baseUrl,
    url,
    body, method,
    abortController,
    pathToRevalidate,
    headers
  }: PostPutPatch & { method: "POST" | "PUT" | "PATCH"; }
) => {
  const token = await getCookie("token", { cookies }) as string;
  const completeUrl = `${baseUrlsApis[baseUrl]}${url}`;

  const response = await fetch(
    completeUrl,
    {
      method,
      body: JSON.stringify(body),
      headers: headers || getHeaders(token),
      signal: abortController?.signal
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw handleError(error);
  }

  if (pathToRevalidate) revalidateTag(pathToRevalidate);

  return response.json() as Promise<T>;
};
