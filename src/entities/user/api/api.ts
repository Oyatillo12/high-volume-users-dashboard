import { sleep } from "@/shared/lib";
import type { User } from "../model/types";

export async function updateUser(_user: User) {
  await sleep(1000);

  if (Math.random() < 0.2) {
    throw new Error("Failed to update user");
  }

  return _user;
}
