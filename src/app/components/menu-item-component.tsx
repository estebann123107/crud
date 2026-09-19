"use client";

import { ReactNode } from "react";
import { MenuView } from "@/app/types";

type MenuItemComponentProps = {
  view: MenuView;
  label: string;
  icon?: ReactNode;
  isActive: boolean;
  onSelect: (view: MenuView) => void;
};

export const MenuItemComponent = ({
  view,
  label,
  icon,
  isActive,
  onSelect,
}: MenuItemComponentProps) => {
  return (
    <li className="menu-item">
      <button
        type="button"
        className={`menu-item-button${isActive ? " is-active" : ""}`}
        onClick={() => onSelect(view)}
        aria-current={isActive ? "page" : undefined}
      >
        {icon}
        <span className="menu-item-label">{label}</span>
      </button>
    </li>
  );
};
