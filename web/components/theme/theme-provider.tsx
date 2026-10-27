"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type Theme = "light" | "dark";

/** The stored key the previous build used, kept so a saved choice survives. */
const STORAGE_KEY = "vs-theme";

type ThemeContextValue = {
  /** Null until mounted, so the first client render matches the server. */
  theme: Theme | null;
  setTheme: (theme: Theme) => void;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function systemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function storedTheme(): Theme | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

/**
 * The theme is applied after hydration, not before paint: the document paints
 * from the system preference through the media query, then this effect applies
 * the stored choice. See design.md D6.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme | null>(null);

  useEffect(() => {
    const stored = storedTheme();
    const next = stored ?? systemTheme();
    document.documentElement.setAttribute("data-theme", next);
    setThemeState(next);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    document.documentElement.setAttribute("data-theme", next);
    setThemeState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // A reader with storage disabled still gets the choice for this visit.
    }
  }, []);

  const toggle = useCallback(() => {
    setTheme((theme ?? systemTheme()) === "dark" ? "light" : "dark");
  }, [setTheme, theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const value = useContext(ThemeContext);
  if (value === null) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return value;
}
