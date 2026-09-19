import { useEffect, useSyncExternalStore } from "react";
import { Theme } from "@/app/types";

export const THEME_STORAGE_KEY = "todo-theme";

const listeners = new Set<() => void>();

let snapshot: Theme | null = null;
let colorSchemeQuery: MediaQueryList | null = null;
let isWatching = false;

const isTheme = (value: string | null): value is Theme =>
  value === "light" || value === "dark";

const getColorSchemeQuery = () => {
  colorSchemeQuery ??= window.matchMedia("(prefers-color-scheme: dark)");
  return colorSchemeQuery;
};

const readStoredTheme = (): Theme | null => {
  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(storedTheme) ? storedTheme : null;
  } catch (error) {
    console.error("Error reading theme", error);
    return null;
  }
};

/* Lo que el usuario eligió manda; si no ha elegido, manda el sistema. */
const readTheme = (): Theme =>
  readStoredTheme() ?? (getColorSchemeQuery().matches ? "dark" : "light");

const getSnapshot = (): Theme => {
  snapshot ??= readTheme();
  return snapshot;
};

const getServerSnapshot = (): Theme => "light";

const emitChange = () => {
  snapshot = null;
  listeners.forEach((listener) => listener());
};

const handleStorage = (event: StorageEvent) => {
  if (event.key === THEME_STORAGE_KEY) emitChange();
};

/* El sistema solo decide mientras no haya preferencia guardada. */
const handleColorSchemeChange = () => {
  if (readStoredTheme()) return;
  emitChange();
};

const watch = () => {
  if (isWatching) return;

  window.addEventListener("storage", handleStorage);
  getColorSchemeQuery().addEventListener("change", handleColorSchemeChange);
  isWatching = true;
};

const subscribe = (listener: () => void) => {
  watch();
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
};

const setTheme = (theme: Theme) => {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (error) {
    console.error("Error saving theme", error);
  }

  emitChange();
};

export const useTheme = () => {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return {
    theme,
    isDark: theme === "dark",
    setTheme,
    toggleTheme: () => setTheme(theme === "dark" ? "light" : "dark"),
  };
};
