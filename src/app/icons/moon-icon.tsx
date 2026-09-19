import { Icon, type IconProps } from "./icon-base";

/* lucide: moon */
export const MoonIcon = (props: IconProps) => {
  return (
    <Icon {...props}>
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </Icon>
  );
};
