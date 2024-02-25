import { VercelPgDatabase } from "drizzle-orm/vercel-postgres";
import { organizationTable, usersTable } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function getOrganization(
  db: VercelPgDatabase<Record<string, never>>,
  userId: string
) {
  return await db
    .select()
    .from(organizationTable)
    .leftJoin(usersTable, eq(usersTable.organizationId, organizationTable.id))
    .where(and(eq(usersTable.authId, userId)));
}