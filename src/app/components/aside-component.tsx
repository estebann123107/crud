"use client";

import { useMenuView } from "@/app/hooks/use-menu-view";
import { useAsideState } from "@/app/hooks/use-aside-state";
import { MenuComponent } from "./menu-component";

export const AsideComponent = () => {
  const { isExpanded, setIsExpanded } = useAsideState();
  const { view, setView } = useMenuView();

  return (
    <aside className={`aside ${isExpanded ? "is-expanded" : ""}`}>
      <button
        type="button"
        className="aside-toggle"
        onClick={() => setIsExpanded((prev) => !prev)}
        aria-expanded={isExpanded}
        aria-label={isExpanded ? "Cerrar herramientas" : "Abrir herramientas"}
      >
       <h2 className="aside-title">Crud</h2>
      </button>

      <div className="aside-content">
        <MenuComponent activeView={view} onSelect={setView} />
      </div>
    </aside>
  );
};