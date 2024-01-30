/* eslint-disable @typescript-eslint/no-explicit-any */
export type ApiRequestOptions = {
  readonly method:
    | "GET"
    | "PUT"
    | "POST"
    | "DELETE"
    | "OPTIONS"
    | "HEAD"
    | "PATCH";
  readonly url: string;
  readonly path?: Record<string, any>;
  readonly cookies?: Record<string, any>;
  readonly headers?: Record<string, any>;
  readonly query?: Record<string, any>;
  readonly formData?: Record<string, any>;
  readonly body?: any;
  readonly mediaType?: string;
  readonly responseHeader?: string;
  readonly errors?: Record<number, string>;
};

export type ApiResult = {
  readonly url: string;
  readonly ok: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly body: any;
};

class ApiError extends Error {
  public readonly url: string;
  public readonly status: number;
  public readonly statusText: string;
  public readonly body: any;
  public readonly request: ApiRequestOptions;

  constructor(
    request: ApiRequestOptions,
    response: ApiResult,
    message: string
  ) {
    super(message);

    this.name = "ApiError";
    this.url = response.url;
    this.status = response.status;
    this.statusText = response.statusText;
    this.body = response.body;
    this.request = request;
  }
}

interface ApiDetailedError extends ApiError {
  body: { message: string | string[] };
}

const isError = (e: unknown): e is Error => "message" in (e as Error);
const isApiError = (e: unknown): e is ApiDetailedError =>
  !!(e as ApiDetailedError)?.body?.message;

export const getErrMsg = (
  e: unknown | undefined,
  defaultMsg: string
): string => {
  if (!e) {
    return defaultMsg;
  }

  if (isApiError(e)) {
    if (typeof e.body.message === "string") {
      return e.body.message;
    }

    return e.body.message.join(",");
  }

  if (isError(e)) {
    return e.message;
  }

  return defaultMsg;
};
