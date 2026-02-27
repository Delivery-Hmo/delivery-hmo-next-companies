
import { BaseUrl } from "@src/types/services/http";

export interface GetList<T> {
  total: number;
  list: Array<T>;
}

export interface BaseHttpProps {
  baseUrl: BaseUrl;
  url: string;
  abortController?: AbortController;
  searchParams?: Record<string, string>;
  token?: string;
}

export interface HttpProps extends BaseHttpProps {
  body: unknown;
  pathToRevalidate?: string;
  formUrlencoded?: boolean;
  headers?: Record<string, string>;
  withOutToken?: boolean;
}

export interface ResponseError {
  error?: { message?: string; };
  message?: string;
}