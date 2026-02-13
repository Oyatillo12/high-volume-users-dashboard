import type { InputHTMLAttributes } from "react";
import styles from "./Input.module.css";
import { cx } from "@/shared/lib";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export function Input({ className, label, error, ...props }: Props) {
  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        className={cx(styles.input, error && styles.errorInput, className)}
        {...props}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}
