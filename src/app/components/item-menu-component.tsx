import type { ButtonHTMLAttributes, ReactNode } from "react";

interface MenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon: ReactNode;
	text: string;
	active?: boolean;
}

export const MenuItemComponent = ({
	icon,
	text,
	active = false,
	className = "",
	...buttonProps
}: MenuItemProps) => {
	const menuItemClassName = ["menu-item", active && "active", className]
		.filter(Boolean)
		.join(" ");

	return (
		<button
			{...buttonProps}
			type={buttonProps.type ?? "button"}
			className={menuItemClassName}
			aria-current={active ? "page" : undefined}
			aria-label={buttonProps["aria-label"] ?? text}
		>
			<span className="menu-item-icon" aria-hidden="true">
				{icon}
			</span>
			<span className="menu-item-text">{text}</span>
		</button>
	);
};