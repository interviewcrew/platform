import { VercelPgDatabase } from "drizzle-orm/vercel-postgres";
import { companiesTable, usersTable } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function getCompany(
  db: VercelPgDatabase<Record<string, never>>,
  userId: string
) {
  return await db
    .select()
    .from(companiesTable)
    .leftJoin(usersTable, eq(usersTable.companyId, companiesTable.id))
    .where(and(eq(usersTable.authId, userId)));
}