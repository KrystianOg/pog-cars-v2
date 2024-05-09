export function classnames(
  ...args: (string | false | undefined)[]
): string | undefined {
  return args.filter(Boolean).join(" ");
}
