"use client";

import { useEffect, useState } from "react";

const THEME_STORAGE_KEY = "todo-theme";

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    const darkMode = storedTheme === "dark";

    document.documentElement.dataset.theme = darkMode ? "dark" : "light";
    setIsDark(darkMode);
  }, []);

  const toggleTheme = () => {
    const nextTheme = isDark ? "light" : "dark";

    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    setIsDark(nextTheme === "dark");
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      title={isDark ? "Modo claro" : "Modo oscuro"}
    >
      <span aria-hidden="true">{isDark ? "☀" : "☾"}</span>
    </button>
  );
};