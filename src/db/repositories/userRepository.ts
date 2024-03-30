import { VercelPgDatabase } from "drizzle-orm/vercel-postgres";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import * as schema from "@/db/schema";

export async function getUserByExternalId(
  db: VercelPgDatabase<typeof schema>,
  externalId: string
) {
  return await db.query.usersTable.findFirst({
    where: eq(usersTable.externalId, externalId),
  });
}
