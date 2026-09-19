"use client";

import { useEffect, useState } from "react";
import { MenuView } from "@/app/types";
import { useAsideState } from "@/app/hooks/use-aside-state";
import { useMenuView } from "@/app/hooks/use-menu-view";
import { CheckIcon } from "@/app/icons/check-icon";
import { PanelLeftIcon } from "@/app/icons/panel-left-icon";
import { MenuComponent } from "./menu-component";
import { ThemeToggle } from "./theme-toggle";

export const AsideComponent = () => {
  const { isExpanded, setIsExpanded } = useAsideState();
  const { view, setView } = useMenuView();
  /* El cajón móvil nunca se recuerda: cada carga empieza cerrado. */
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    if (!isDrawerOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsDrawerOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDrawerOpen]);

  const handleSelect = (nextView: MenuView) => {
    setView(nextView);
    setIsDrawerOpen(false);
  };

  const asideClassName = [
    "aside",
    isExpanded ? "" : "is-collapsed",
    isDrawerOpen ? "is-open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <button
        type="button"
        className="btn btn-icon btn-lg btn-secondary aside-trigger"
        onClick={() => setIsDrawerOpen(true)}
        aria-label="Abrir menú"
        aria-expanded={isDrawerOpen}
        aria-controls="app-sidebar"
      >
        <PanelLeftIcon direction="open" size={20} strokeWidth={1.8} />
      </button>

      <button
        type="button"
        className="aside-scrim"
        onClick={() => setIsDrawerOpen(false)}
        aria-label="Cerrar menú"
        hidden={!isDrawerOpen}
        tabIndex={isDrawerOpen ? 0 : -1}
      />

      <aside id="app-sidebar" className={asideClassName} aria-label="Menú principal">
        <div className="aside-header">
          <span className="aside-mark">
            <CheckIcon size={15} strokeWidth={3} />
          </span>
          <span className="aside-name">Crud</span>

          <button
            type="button"
            className="btn btn-icon aside-collapse"
            onClick={() => setIsExpanded((wasExpanded) => !wasExpanded)}
            aria-label={
              isExpanded ? "Contraer menú lateral" : "Expandir menú lateral"
            }
            aria-expanded={isExpanded}
            aria-controls="app-sidebar"
          >
            <PanelLeftIcon
              direction={isExpanded ? "close" : "open"}
              size={18}
              strokeWidth={1.8}
            />
          </button>

          <button
            type="button"
            className="btn btn-icon btn-lg aside-close"
            onClick={() => setIsDrawerOpen(false)}
            aria-label="Cerrar menú"
          >
            <PanelLeftIcon direction="close" size={20} strokeWidth={1.8} />
          </button>
        </div>

        <MenuComponent activeView={view} onSelect={handleSelect} />

        <div className="aside-footer">
          <ThemeToggle />
          <p className="aside-note">v0.3 · almacenamiento local</p>
        </div>
      </aside>
    </>
  );
};
