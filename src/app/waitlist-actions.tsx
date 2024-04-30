"use server";

import { updateUser } from "@/db/repositories/userRepository";
import { User } from "@/db/schema";

export async function registerWaitlist(user: User) {
  return updateUser(user);
}

export async function activateUser(
  user: User,
  activationCode: string
): Promise<boolean> {
  if (activationCode !== "yc-s24") {
    return false;
  }

  await updateUser({
    ...user,
    activatedAt: new Date(),
  });

  return true;
}
