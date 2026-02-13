import { useMemo, useState } from "react";
import { type SortKey, type SortDir } from "../ui/UsersToolbar";
import { useDebouncedValue } from "@/shared/lib";
import type { User } from "@/entities/user";

export function useUsersQuery(users: User[]) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 400);

  const [onlyActive, setOnlyActive] = useState(false);

  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const filteredSorted = useMemo(() => {
    let list = users;

    if (onlyActive) {
      list = list.filter((u) => u.isActive);
    }

    if (debouncedQuery) {
      const q = debouncedQuery.toLowerCase();
      list = list.filter((u) => {
        const s = `${u.name} ${u.email} ${u.country}`.toLowerCase();
        return s.includes(q);
      });
    }

    const dir = sortDir === "asc" ? 1 : -1;
    return [...list].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (av < bv) return -1 * dir;
      if (av > bv) return 1 * dir;
      return 0;
    });
  }, [users, onlyActive, debouncedQuery, sortKey, sortDir]);

  return {
    query,
    onlyActive,
    sortKey,
    sortDir,
    filteredSorted,
    setQuery,
    setOnlyActive,
    setSortKey,
    setSortDir,
  };
}
