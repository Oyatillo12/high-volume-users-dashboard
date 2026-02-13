import { useCallback, useEffect, useState } from "react";
import { UsersToolbar, useUsersQuery } from "@/features/usersToolbar";

import styles from "./UsersPage.module.css";
import { useUsers } from "../model/useUsers";
import { updateUser, UserModal, UsersTable, type User } from "@/entities/user";
import { EmptyState, ErrorState, LoadingState } from "@/shared/ui";

export function UsersPage() {
  const { state, api } = useUsers();
  const [selected, setSelected] = useState<User | null>(null);

  const {
    query,
    onlyActive,
    sortKey,
    sortDir,
    filteredSorted,
    setQuery,
    setOnlyActive,
    setSortKey,
    setSortDir,
  } = useUsersQuery(state.users);

  useEffect(() => {
    api.loadUsers();
  }, [api]);

  const handleSaveUser = async (next: User) => {
    const prev = state.users.find((u) => u.id === next.id);
    if (!prev) return;

    api.optimisticUpdate(next);

    try {
      await updateUser(next);
    } catch (e) {
      api.rollback(prev);
      alert(`Save failed, rolled back: ${(e as Error).message}`);
      throw e;
    }
  };

  const handleCloseUserModal = () => {
    setSelected(null);
  };

  const handleRowClick = useCallback((u: User) => {
    setSelected(u);
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>High-Volume Users Dashboard</h1>

      <UsersToolbar
        searchQuery={query}
        onlyActive={onlyActive}
        sortKey={sortKey}
        sortDir={sortDir}
        onSearchChange={setQuery}
        onOnlyActiveChange={setOnlyActive}
        onSortKeyChange={setSortKey}
        onSortDirChange={setSortDir}
      />

      {state.status === "loading" && (
        <LoadingState message="Loading 10,000 users..." />
      )}

      {state.status === "error" && (
        <ErrorState message={state.error} onRetry={api.loadUsers} />
      )}

      {state.status === "ready" && filteredSorted.length === 0 && (
        <EmptyState message="No users match your criteria." />
      )}

      {state.status === "ready" && filteredSorted.length > 0 && (
        <UsersTable users={filteredSorted} onRowClick={handleRowClick} />
      )}

      {selected && (
        <UserModal
          user={selected}
          onClose={handleCloseUserModal}
          onSave={handleSaveUser}
        />
      )}
    </div>
  );
}
