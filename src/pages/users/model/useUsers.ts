import { useMemo, useReducer } from "react";
import type { User } from "../../../entities/user/model/types";
import { generateUsers } from "../../../entities/user/lib/generateUsers";
import { sleep } from "@/shared/lib";

type State = {
  status: "loading" | "ready" | "error";
  error?: string;
  users: User[];
};

type Action =
  | { type: "LOAD_START" }
  | { type: "LOAD_SUCCESS"; users: User[] }
  | { type: "LOAD_ERROR"; error: string }
  | { type: "UPDATE_OPTIMISTIC"; user: User }
  | { type: "ROLLBACK"; prev: User };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "LOAD_START":
      return { ...state, status: "loading" };
    case "LOAD_SUCCESS":
      return { ...state, status: "ready", users: action.users };
    case "LOAD_ERROR":
      return { ...state, status: "error", error: action.error };
    case "UPDATE_OPTIMISTIC":
      return {
        ...state,
        users: state.users.map((u) =>
          u.id === action.user.id ? action.user : u,
        ),
      };
    case "ROLLBACK":
      return {
        ...state,
        users: state.users.map((u) =>
          u.id === action.prev.id ? action.prev : u,
        ),
      };
    default:
      return state;
  }
}

export function useUsers() {
  const [state, dispatch] = useReducer(reducer, {
    status: "loading",
    users: [],
  });

  const loadUsers = async () => {
    try {
      dispatch({ type: "LOAD_START" });

      await sleep(500);

      const users = generateUsers(10_000);
      dispatch({ type: "LOAD_SUCCESS", users });
    } catch (error) {
      dispatch({ type: "LOAD_ERROR", error: (error as Error)?.message });
    }
  };

  const api = useMemo(
    () => ({
      loadUsers,
      optimisticUpdate: (user: User) => {
        dispatch({ type: "UPDATE_OPTIMISTIC", user });
      },
      rollback: (prev: User) => {
        dispatch({ type: "ROLLBACK", prev });
      },
    }),
    [],
  );

  return { state, api };
}
