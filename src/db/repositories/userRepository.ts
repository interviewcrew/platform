import { drizzle } from "drizzle-orm/vercel-postgres";
import { NewUser, User, usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import * as schema from "@/db/schema";
import { sql } from "@vercel/postgres";

export async function getUserByExternalId(externalId: string): Promise<User | undefined> {
  const db = drizzle(sql, { schema });

  return db.query.usersTable.findFirst({
    where: eq(usersTable.externalId, externalId),
  });
}

export async function createUser(user: NewUser): Promise<User> {
  const db = drizzle(sql, { schema });

  return (
    await db.insert(usersTable).values(user).onConflictDoNothing().returning({
      id: usersTable.id,
      externalId: usersTable.externalId,
      organizationId: usersTable.organizationId,
      createdAt: usersTable.createdAt,
      updatedAt: usersTable.updatedAt,
    })
  )[0];
}
