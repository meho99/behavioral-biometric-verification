import { AxiosError } from "axios";

const isError = (e: unknown): e is Error => "message" in (e as Error);
const isAxiosError = (e: unknown): e is AxiosError =>
  !!(e as AxiosError)?.response?.data;

export const getErrMsg = (
  e: unknown | undefined,
  defaultMsg: string
): string => {
  if (!e) {
    return defaultMsg;
  }

  if (isAxiosError(e)) {
    if (typeof e.response?.data === "string") {
      return e.response.data;
    }
  }

  if (isError(e)) {
    return e.message;
  }

  return defaultMsg;
};
