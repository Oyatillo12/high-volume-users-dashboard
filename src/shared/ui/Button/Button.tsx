import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";
import { cx } from "@/shared/lib";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
  loading?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  children,
  ...props
}: Props) {
  return (
    <button
      className={cx(
        styles.button,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        className
      )}
      disabled={props.disabled || loading}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
