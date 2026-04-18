import React from "react";
import styles from "./Button.module.scss";
import clsx from "clsx";

export type ButtonVariant = "primary" | "secondary" | "tertiary";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  label?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  label = "Button",
  children,
  className,
  ...rest
}) => {
  return (
    <button
      className={clsx(styles.button, styles[variant], className)}
      aria-label={label}
      {...rest}
    >
      {children ?? label}
    </button>
  );
};

export default Button;
