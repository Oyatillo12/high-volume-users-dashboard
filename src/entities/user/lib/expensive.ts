import type { User } from "../model/types";

export function computeUserScore(user: User): number {
  const s = `${user.name}|${user.email}|${user.country}|${user.createdAt}|${user.age}`;
  let hash = 0;

  for (let i = 0; i < s.length; i++) {
    hash = (hash * 31 + s.charCodeAt(i)) | 0;

    hash ^= (hash << 5) | (hash >>> 2);
  }

  return hash;
}
