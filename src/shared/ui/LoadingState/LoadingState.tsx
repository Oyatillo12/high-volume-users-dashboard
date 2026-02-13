import styles from "./LoadingState.module.css";

type Props = {
  message?: string;
};

export function LoadingState({ message = "Loading..." }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.spinner} />
      <span>{message}</span>
    </div>
  );
}
