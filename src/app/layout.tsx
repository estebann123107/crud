import "./globals.css";

/* Corre antes del primer pintado: sin esto la página parpadea en claro
   antes de que React aplique el tema guardado o el del sistema. */
const applyThemeBeforePaint = `
(function () {
  try {
    var stored = window.localStorage.getItem("todo-theme");
    var theme =
      stored === "dark" || stored === "light"
        ? stored
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    document.documentElement.dataset.theme = theme;
  } catch (error) {}
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: applyThemeBeforePaint }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
