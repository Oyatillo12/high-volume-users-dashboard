import type { HTMLAttributes, ReactNode } from "react";
import styles from "./Badge.module.css";
import { cx } from "@/shared/lib";

type Props = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  variant?: "neutral" | "success" | "error";
};

export function Badge({
  className,
  children,
  variant = "neutral",
  ...props
}: Props) {
  return (
    <span className={cx(styles.badge, styles[variant], className)} {...props}>
      {children}
    </span>
  );
}
