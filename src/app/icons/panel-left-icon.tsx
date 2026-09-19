import { Icon, type IconProps } from "./icon-base";

type PanelLeftIconProps = IconProps & {
  /* Hacia dónde apunta el galón: el sentido en que se moverá el panel. */
  direction?: "close" | "open";
};

/* lucide: panel-left-close / panel-left-open */
export const PanelLeftIcon = ({
  direction = "close",
  ...props
}: PanelLeftIconProps) => {
  return (
    <Icon {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 3v18" />
      {direction === "close" ? (
        <path d="m16 15-3-3 3-3" />
      ) : (
        <path d="m14 9 3 3-3 3" />
      )}
    </Icon>
  );
};
