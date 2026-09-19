"use client";

import { ReactNode } from "react";
import { MenuView } from "@/app/types";

type MenuItemComponentProps = {
  view: MenuView;
  label: string;
  icon?: ReactNode;
  count?: number;
  isActive: boolean;
  onSelect: (view: MenuView) => void;
};

export const MenuItemComponent = ({
  view,
  label,
  icon,
  count,
  isActive,
  onSelect,
}: MenuItemComponentProps) => {
  const hasCount = typeof count === "number";

  return (
    <li className="menu-item">
      <button
        type="button"
        className={`menu-item-button${isActive ? " is-active" : ""}`}
        onClick={() => onSelect(view)}
        aria-current={isActive ? "page" : undefined}
        /* En modo riel la etiqueta se oculta, así que el nombre va aquí. */
        aria-label={hasCount ? `${label}, ${count}` : label}
      >
        {icon}
        <span className="menu-item-label">{label}</span>
        {hasCount ? (
          <span className="menu-item-count" aria-hidden="true">
            {count}
          </span>
        ) : null}
      </button>
    </li>
  );
};
