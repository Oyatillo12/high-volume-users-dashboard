import { memo, useMemo, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { User } from "../../model/types";
import { Badge } from "@/shared/ui";
import { computeUserScore } from "../../lib/expensive";

import styles from "./UsersTable.module.css";

type Props = {
  users: User[];
  onRowClick: (u: User) => void;
};

const PAGE_SIZE = 200;

export function UsersTable({ users, onRowClick }: Props) {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const [limit, setLimit] = useState(PAGE_SIZE);

  const visibleUsers = useMemo(() => users.slice(0, limit), [users, limit]);

  const rowVirtualizer = useVirtualizer({
    count: visibleUsers.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 44,
    overscan: 8,
  });

  const handleScroll = () => {
    const el = parentRef.current;
    if (!el) return;

    const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 200;
    if (nearBottom && limit < users.length) {
      setLimit((x) => Math.min(x + PAGE_SIZE, users.length));
    }
  };

  const items = rowVirtualizer.getVirtualItems();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>Name</div>
        <div>Email</div>
        <div>Age</div>
        <div>Country</div>
        <div>Active</div>
        <div>Score</div>
      </div>

      <div
        ref={parentRef}
        className={styles.scrollArea}
        onScroll={handleScroll}
      >
        <div
          className={styles.virtualContainer}
          style={{ height: rowVirtualizer.getTotalSize() }}
        >
          {items.map((vRow) => {
            const u = visibleUsers[vRow.index];
            return (
              <Row
                key={u.id}
                user={u}
                top={vRow.start}
                onClick={onRowClick}
              />
            );
          })}
        </div>
      </div>

      <div className={styles.footer}>
        Showing {visibleUsers.length.toLocaleString()} / {users.length.toLocaleString()}
      </div>
    </div>
  );
}

const Row = memo(function Row({
  user,
  top,
  onClick,
}: {
  user: User;
  top: number;
  onClick: (u: User) => void;
}) {
  const score = useMemo(() => computeUserScore(user), [user]);

  return (
    <div
      onClick={() => onClick(user)}
      className={styles.row}
      style={{ top }}
    >
      <div className={styles.cell} title={user.name}>{user.name}</div>
      <div className={styles.cell} title={user.email}>{user.email}</div>
      <div className={styles.cell}>{user.age}</div>
      <div className={styles.cell} title={user.country}>{user.country}</div>
      <div>
        <Badge variant={user.isActive ? "success" : "neutral"}>
          {user.isActive ? "Yes" : "No"}
        </Badge>
      </div>
      <div className={styles.cell}>{score}</div>
    </div>
  );
});
