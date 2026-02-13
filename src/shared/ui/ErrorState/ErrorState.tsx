import type { ReactNode } from "react";
import styles from "./ErrorState.module.css";
import { Button } from "../Button/Button";

type Props = {
  message?: string;
  onRetry?: VoidFunction;
  children?: ReactNode;
};

export function ErrorState({ message = "Something went wrong", onRetry, children }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.message}>{message}</div>
      {children}
      {onRetry && (
        <Button onClick={onRetry} size="sm" variant="secondary">
          Try Again
        </Button>
      )}
    </div>
  );
}
