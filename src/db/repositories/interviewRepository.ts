import { VercelPgDatabase } from "drizzle-orm/vercel-postgres";
import { interviewsTable, organizationTable, problemsTable, submissionsTable, transcriptionsTable, usersTable } from "@/db/schema";
import { eq, and, count } from "drizzle-orm";

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

export async function getAllInterviews(
  db: VercelPgDatabase<Record<string, never>>,
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
    .leftJoin(problemsTable, eq(problemsTable.id, interviewsTable.problemId))
    .leftJoin(submissionsTable, eq(submissionsTable.interviewId, interviewsTable.id))
    .where(eq(usersTable.authId, userId));
}

export async function getUpcomingInterviews(
  db: VercelPgDatabase<Record<string, never>>,
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
    .leftJoin(transcriptionsTable, eq(transcriptionsTable.interviewId, interviewsTable.id))
    .leftJoin(problemsTable, eq(problemsTable.id, interviewsTable.problemId))
    .leftJoin(submissionsTable, eq(submissionsTable.interviewId, interviewsTable.id))
    .where(
      and(
        eq(usersTable.authId, userId),
        eq(count(transcriptionsTable.interviewId), 0)
      )
    );
}