import type { ReactNode } from "react";
import styles from "./EmptyState.module.css";

type Props = {
  message?: string;
  icon?: ReactNode;
  children?: ReactNode;
};

export function EmptyState({ message = "No data found", icon = "∅", children }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>{icon}</div>
      <div>{message}</div>
      {children}
    </div>
  );
}
