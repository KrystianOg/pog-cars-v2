const defaultParams: RequestInit = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
};

/** related article: https://www.30secondsofcode.org/js/s/parse-or-serialize-cookie/ */
const parseCookie = (str: string) =>
  str
    .split(";")
    .map((v) => v.split("="))
    .reduce(
      (acc, [key, value]) => {
        if (!value) return acc;
        acc[decodeURIComponent(key?.trim())] = decodeURIComponent(
          value?.trim(),
        );
        return acc;
      },
      {} as Record<string, string>,
    );

function parseJwt(token: string) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join(""),
  );

  return JSON.parse(jsonPayload);
}

const refreshToken = async (): Promise<void> => {
  if (typeof window === "undefined") return;

  const cookie = parseCookie(document.cookie);

  /* it means that user is logged out */
  if (!cookie.access_token) return;

  const [type, token] = cookie.access_token?.split(" ") ?? [];

  if (type !== "Bearer") return;
  const data = parseJwt(token);
  // get expiration timestamp from access_token
  if (new Date().getTime() > parseInt(data.exp) * 1000) {
    const refreshTokenUrl = new URL(
      "/refresh-token",
      process.env.NEXT_PUBLIC_BACKEND_URL,
    );
    await fetch(refreshTokenUrl);
  }
};

const _fetch = async (subpath: string, init?: Parameters<typeof fetch>[1]) => {
  const backendUrl = new URL(subpath, process.env.NEXT_PUBLIC_BACKEND_URL);

  await refreshToken();

  return fetch(backendUrl, {
    ...defaultParams,
    headers: {
      ...defaultParams.headers,
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
