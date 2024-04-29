export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type ReversePartialBy<T, K extends keyof T> = Partial<Omit<T, K>> &
  Pick<T, K>;

export type RequiredBy<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;

export type Prettify<T> = {
  [K in keyof T]: T[K];
  // eslint-disable-next-line
} & {};
