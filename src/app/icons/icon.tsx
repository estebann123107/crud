import type { ReactNode, SVGProps } from "react";

export type IconProps = Omit<
  SVGProps<SVGSVGElement>,
  "width" | "height" | "viewBox" | "fill" | "stroke"
> & {
  size?: number;
  strokeWidth?: number;
};

type BaseIconProps = IconProps & { children: ReactNode };

/* Base compartida de los iconos: geometría de Lucide sobre un lienzo de 24,
   trazo heredado del color del texto y tamaño por los tokens --icon-*.
   Los iconos son decorativos: el nombre accesible vive en el control. */
export const Icon = ({
  size = 18,
  strokeWidth = 2,
  children,
  ...svgProps
}: BaseIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...svgProps}
    >
      {children}
    </svg>
  );
};
