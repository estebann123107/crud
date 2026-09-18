"use client";

import { useState } from "react";

export const AsideComponent = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside className={`aside ${isExpanded ? "is-expanded" : ""}`}>
      <button
        type="button"
        className="aside-toggle"
        onClick={() => setIsExpanded((prev) => !prev)}
        aria-expanded={isExpanded}
        aria-label={isExpanded ? "Cerrar herramientas" : "Abrir herramientas"}
      >
        <h2 className="aside-title">Aside</h2>
      </button>

      <div className="aside-content">
        <p>This is the aside content.</p>
      </div>
    </aside>
  );
};