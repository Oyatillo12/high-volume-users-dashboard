import type { SelectHTMLAttributes } from "react";
import styles from "./Select.module.css";
import { cx } from "@/shared/lib";

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
};

export function Select({ className, label, ...props }: Props) {
  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      <select className={cx(styles.select, className)} {...props} />
    </div>
  );
}
