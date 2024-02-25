import { VercelPgDatabase } from "drizzle-orm/vercel-postgres";
import { interviewsTable, organizationTable, usersTable } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export type Interview = {
  title: string;
  hash: string;
};

export async function getInterview(
  db: VercelPgDatabase<Record<string, never>>,
  interviewHash: string,
  userId: string
) {
  return await db
    .select()
    .from(interviewsTable)
    .leftJoin(
      organizationTable,
      eq(interviewsTable.organizationId, organizationTable.id)
    )
    .leftJoin(usersTable, eq(usersTable.organizationId, organizationTable.id))
    .where(
      and(
        eq(interviewsTable.hash, interviewHash),
        eq(usersTable.authId, userId)
      )
    );
}

export async function insertInterview(
  db: VercelPgDatabase<Record<string, never>>,
  interview: Interview,
  organizationId: number
) {
  return await db
    .insert(interviewsTable)
    .values({
      ...interview,
      organizationId: organizationId,
      problemId: null,
    })
    .onConflictDoNothing()
    .returning({
      id: interviewsTable.id,
      title: interviewsTable.title,
      hash: interviewsTable.hash,
      organizationId: interviewsTable.organizationId,
      problemId: interviewsTable.problemId,
      createdAt: interviewsTable.createdAt,
      updatedAt: interviewsTable.updatedAt,
    });
}
