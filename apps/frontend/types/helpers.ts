export type Kebab<
  T extends string,
  A extends string = "",
> = T extends `${infer F}${infer R}`
  ? Kebab<
      R,
      `${A}${F extends Lowercase<F> ? "" : A extends "" ? "" : "-"}${Lowercase<F>}`
    >
  : A;
