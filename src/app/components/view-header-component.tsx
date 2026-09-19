import { ReactNode } from "react";

type ViewHeaderComponentProps = {
  titleId: string;
  eyebrow: string;
  title: string;
  action?: ReactNode;
  meta?: ReactNode;
};

/* Cabecera compartida: antes la página fijaba "Mis tareas" para todo y la
   papelera repetía su propio título y contador por debajo. */
export const ViewHeaderComponent = ({
  titleId,
  eyebrow,
  title,
  action,
  meta,
}: ViewHeaderComponentProps) => {
  return (
    <header className="view-header">
      <p className="view-eyebrow">{eyebrow}</p>

      <div className="view-title-row">
        <h1 id={titleId} className="view-title">
          {title}
          <span className="view-title-dot" aria-hidden="true">
            .
          </span>
        </h1>
        {action}
      </div>

      {meta}
    </header>
  );
};
