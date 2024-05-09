import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function useRouter(): AppRouterInstance {
  return {
    push: () => {},
    replace: () => {},
    prefetch: () => {},
    back: () => {},
    forward: () => {},
    refresh: () => {},
  };
}

export function usePathname(): string {
  return "/cars";
}
