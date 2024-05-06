const _fetch = (subpath: string, init?: Parameters<typeof fetch>[1]) => 
  {
  const backendUrl = new URL(subpath, process.env.NEXT_PUBLIC_BACKEND_URL)
  return fetch(backendUrl, init)
}

type params = Parameters<typeof _fetch>
type PostParams<T> = [params[0], Omit<params[1], "body"> & { body: T}]

export const post = <T>(...params: PostParams<T>) => {
  const body = JSON.stringify(params[1].body)

  return _fetch(params[0], {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    ...params[1],
    body,
  })
}
