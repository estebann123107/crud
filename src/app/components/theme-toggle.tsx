"use client";

import { useTheme } from "@/app/hooks/use-theme";
import { MoonIcon } from "@/app/icons/moon-icon";
import { SunIcon } from "@/app/icons/sun-icon";

export const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();
  const label = isDark ? "Modo claro" : "Modo oscuro";

  return (
    <button
      type="button"
      className="btn btn-ghost aside-item"
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label={label}
    >
      {isDark ? <SunIcon size={18} strokeWidth={1.9} /> : <MoonIcon size={18} strokeWidth={1.9} />}
      <span className="aside-item-label">{label}</span>
    </button>
  );
};
