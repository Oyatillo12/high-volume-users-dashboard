import type { HTMLAttributes, ReactNode } from "react";
import styles from "./Card.module.css";
import { cx } from "@/shared/lib";

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Card({ className, children, ...props }: Props) {
  return (
    <div className={cx(styles.card, className)} {...props}>
      {children}
    </div>
  );
}
