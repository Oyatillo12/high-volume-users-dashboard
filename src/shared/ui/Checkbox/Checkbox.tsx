import type { InputHTMLAttributes, ReactNode } from "react";
import styles from "./Checkbox.module.css";
import { cx } from "@/shared/lib";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  children?: ReactNode;
};

export function Checkbox({ className, children, ...props }: Props) {
  return (
    <label className={cx(styles.label, className)}>
      <input type="checkbox" className={styles.checkbox} {...props} />
      {children}
    </label>
  );
}
