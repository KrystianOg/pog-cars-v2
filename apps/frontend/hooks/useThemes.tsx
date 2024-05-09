"use client";
import {
  createContext,
  useState,
  useContext,
  useMemo,
  useCallback,
} from "react";
import { useLocalStorage, useMediaQuery } from "usehooks-ts";

const isServer = typeof window === "undefined";
const STORAGE_KEY = "theme";

export interface UseThemeProps {
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  theme?: string | undefined;
}

interface ThemeProviderProps extends React.PropsWithChildren {
  themes?: string[] | undefined;
  enableSystem?: boolean | undefined;
  defaultTheme: "light" | "dark" | "system";
}

const ThemeContext = createContext<UseThemeProps | undefined>(undefined);

export const ThemeProvider = (props: ThemeProviderProps) => {
  const context = useContext(ThemeContext);
  if (context) return props.children;

  return <Theme {...props} />;
};

const Theme = ({
  enableSystem = true,
  defaultTheme = enableSystem ? "system" : "light",
  children,
  themes,
}: ThemeProviderProps) => {
  const [theme, setThemeState] = useLocalStorage<string>(
    STORAGE_KEY,
    defaultTheme,
  );
  const isDark = useMediaQuery("(prefers-color-scheme: dark)");

  const setTheme = useCallback(
    (value: any) => {
      const newTheme = typeof value === "function" ? value(theme) : value;
      setThemeState(newTheme);
      // eslint-disable-next-line
    },
    [theme],
  );

  const providerValue = useMemo(
    () => ({
      theme,
      setTheme,
      themes: enableSystem ? [...(themes || []), "system"] : themes,
    }),
    [theme, themes, setTheme, enableSystem],
  );

  return (
    <ThemeContext.Provider value={providerValue}>
      {children}
    </ThemeContext.Provider>
  );
};

const getTheme = (key: string, fallback?: string): string | undefined => {
  if (isServer) return undefined;
  let theme;
  try {
    theme = localStorage.getItem(key) || undefined;
  } catch (e) {}

  return theme || fallback;
};
