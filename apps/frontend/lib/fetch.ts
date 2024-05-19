"use server";
import { cookies } from "next/headers";

const defaultParams: RequestInit = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
};

const refreshTokenWrapper = async (): Promise<void> => { };

const refreshToken = async (): Promise<void> => {
  const cookieStore = cookies();

  const access_token = cookieStore.get("access_token")?.value;
  const refresh_token = cookieStore.get("refresh_token")?.value;
  /* it means that user is logged out */
  // FIXME: or throw an error ? - log out
  if (!access_token)
    if (false) {
      // TODO: check expiration time
      const refreshTokenUrl = new URL(
        "/refresh-token",
        process.env.NEXT_PUBLIC_BACKEND_URL,
      );
      await fetch(refreshTokenUrl);
    }
};

const _fetch = async (subpath: string, init?: Parameters<typeof fetch>[1]) => {
  const backendUrl = new URL(subpath, process.env.NEXT_PUBLIC_BACKEND_URL);

  const access_token = cookies().get("access_token")?.value;
  // await refreshToken();
  return fetch(backendUrl, {
    ...defaultParams,
    headers: {
      ...defaultParams.headers,
      ...(access_token ? { Authorization: access_token } : {}),
    },
    ...init,
  });
};

export const post = <T>(
  subpath: string,
  params?: Omit<Parameters<typeof fetch>[1], "body"> & { body: T },
) => {
  const body = params?.body ? JSON.stringify(params.body) : undefined;

  return _fetch(subpath, {
    method: "POST",
    ...params,
    body,
  });
};

export const get = (subpath: string, params?: Parameters<typeof fetch>[1]) => {
  return _fetch(subpath, params);
};
