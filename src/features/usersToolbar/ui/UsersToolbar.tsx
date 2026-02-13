import { Button, Checkbox, Input, Select } from "@/shared/ui";
import styles from "./UsersToolbar.module.css";

export type SortKey = "name" | "email" | "age";
export type SortDir = "asc" | "desc";

type Props = {
  searchQuery: string;
  onSearchChange: (value: string) => void;

  onlyActive: boolean;
  onOnlyActiveChange: (val: boolean) => void;

  sortKey: SortKey;
  sortDir: SortDir;
  onSortKeyChange: (key: SortKey) => void;
  onSortDirChange: (dir: SortDir) => void;
};

export function UsersToolbar({
  searchQuery,
  onlyActive,
  sortKey,
  sortDir,
  onSearchChange,
  onOnlyActiveChange,
  onSortKeyChange,
  onSortDirChange,
}: Props) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.searchContainer}>
        <Input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search name/email/country..."
        />
      </div>

      <div className={styles.filters}>
        <Checkbox
          checked={onlyActive}
          onChange={(e) => onOnlyActiveChange(e.target.checked)}
        >
          Only active
        </Checkbox>

        <div className={styles.sortContainer}>
          <span style={{ fontSize: "var(--fontSm)", color: "var(--muted)" }}>
            Sort by:
          </span>
          <div className={styles.sortSelect}>
            <Select
              value={sortKey}
              onChange={(e) => onSortKeyChange(e.target.value as SortKey)}
            >
              <option value="name">Name</option>
              <option value="email">Email</option>
              <option value="age">Age</option>
            </Select>
          </div>
          <Button
            variant="secondary"
            onClick={() => onSortDirChange(sortDir === "asc" ? "desc" : "asc")}
          >
            {sortDir === "asc" ? "Asc" : "Desc"}
          </Button>
        </div>
      </div>
    </div>
  );
}
