import { VercelPgDatabase } from "drizzle-orm/vercel-postgres";
import { assignmentsTable, companiesTable, usersTable } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export type Assignment = {
  title: string;
  hash: string;
};

export async function getAssignment(
  db: VercelPgDatabase<Record<string, never>>,
  assignmentHash: string,
  userId: string
) {
  return await db
    .select()
    .from(assignmentsTable)
    .leftJoin(companiesTable, eq(assignmentsTable.companyId, companiesTable.id))
    .leftJoin(usersTable, eq(usersTable.companyId, companiesTable.id))
    .where(
      and(
        eq(assignmentsTable.hash, assignmentHash),
        eq(usersTable.authId, userId)
      )
    );
}

export async function insertAssignment(
  db: VercelPgDatabase<Record<string, never>>,
  assignment: Assignment,
  companyId: number
) {
  await db
    .insert(assignmentsTable)
    .values({
      ...assignment,
      companyId: companyId,
      problemId: null,
    })
    .onConflictDoNothing();
}