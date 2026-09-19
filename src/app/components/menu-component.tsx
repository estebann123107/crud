"use client";

import { ReactNode } from "react";
import { MenuView } from "@/app/types";
import { useList } from "@/app/hooks/use-list";
import { usePaperBin } from "@/app/hooks/use-paper-bin";
import { ListTodoIcon } from "@/app/icons/list-todo-icon";
import { TrashIcon } from "@/app/icons/trash-icon";
import { MenuItemComponent } from "./menu-item-component";

type MenuComponentProps = {
  activeView: MenuView;
  onSelect: (view: MenuView) => void;
};

const MENU_ITEMS: { view: MenuView; label: string; icon: ReactNode }[] = [
  {
    view: "tasks",
    label: "Tareas",
    icon: <ListTodoIcon size={18} strokeWidth={1.9} />,
  },
  {
    view: "paper-bin",
    label: "Papelera",
    icon: <TrashIcon size={18} strokeWidth={1.9} />,
  },
];

export const MenuComponent = ({ activeView, onSelect }: MenuComponentProps) => {
  const { tasks } = useList();
  const { deletedTasks } = usePaperBin();

  const counts: Record<MenuView, number> = {
    tasks: tasks.length,
    "paper-bin": deletedTasks.length,
  };

  return (
    <nav className="menu" aria-label="Secciones">
      <p className="menu-label" id="menu-label">
        Vistas
      </p>
      <ul className="menu-list" aria-labelledby="menu-label">
        {MENU_ITEMS.map((item) => (
          <MenuItemComponent
            key={item.view}
            view={item.view}
            label={item.label}
            icon={item.icon}
            count={counts[item.view]}
            isActive={activeView === item.view}
            onSelect={onSelect}
          />
        ))}
      </ul>
    </nav>
  );
};
