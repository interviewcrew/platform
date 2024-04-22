import { drizzle } from "drizzle-orm/vercel-postgres";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import * as schema from "@/db/schema";
import { sql } from "@vercel/postgres";

export async function getUserByExternalId(externalId: string) {
  const db = drizzle(sql, { schema });

  return db.query.usersTable.findFirst({
    where: eq(usersTable.externalId, externalId),
  });
}
