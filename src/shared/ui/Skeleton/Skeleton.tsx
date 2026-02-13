import type { HTMLAttributes } from "react";
import styles from "./Skeleton.module.css";
import { cx } from "@/shared/lib";

type Props = HTMLAttributes<HTMLDivElement> & {
  width?: string | number;
  height?: string | number;
};

export function Skeleton({ className, width = "100%", height = "1em", style, ...props }: Props) {
  return (
    <div
      className={cx(styles.skeleton, className)}
      style={{ width, height, ...style }}
      {...props}
    />
  );
}
