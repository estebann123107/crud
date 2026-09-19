"use client";

import { ReactNode } from "react";
import { MenuView } from "@/app/types";
import { CheckIcon } from "@/app/icons/check-icon";
import { TrashIcon } from "@/app/icons/trash-icon";
import { MenuItemComponent } from "./menu-item-component";

type MenuComponentProps = {
  activeView: MenuView;
  onSelect: (view: MenuView) => void;
};

const MENU_ITEMS: { view: MenuView; label: string; icon: ReactNode }[] = [
  { view: "tasks", label: "Tareas", icon: <CheckIcon width={15} height={15} /> },
  {
    view: "paper-bin",
    label: "Papelera",
    icon: <TrashIcon width={15} height={15} />,
  },
];

export const MenuComponent = ({ activeView, onSelect }: MenuComponentProps) => {
  return (
    <nav className="menu" aria-label="Secciones">
      <ul className="menu-list">
        {MENU_ITEMS.map((item) => (
          <MenuItemComponent
            key={item.view}
            view={item.view}
            label={item.label}
            icon={item.icon}
            isActive={activeView === item.view}
            onSelect={onSelect}
          />
        ))}
      </ul>
    </nav>
  );
};
