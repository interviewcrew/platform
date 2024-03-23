import { VercelPgDatabase } from "drizzle-orm/vercel-postgres";
import { interviewsTable, organizationsTable, problemsTable, submissionsTable, transcriptionsTable, usersTable } from "@/db/schema";
import { eq, and, count } from "drizzle-orm";
import * as schema from "@/db/schema";

export type Interview = {
  title: string;
  hash: string;
};
export async function getInterviewByHashId(
  db: VercelPgDatabase<typeof schema>,
  interviewHash: string,
  organiaztionId: number
) {
  const interview = await db.query.interviewsTable.findFirst({
    where: and(
      eq(interviewsTable.hash, interviewHash),
      eq(interviewsTable.organizationId, organiaztionId)
    ),
  });

  return interview;
}

export async function getInterviewByHashIdWithFields(
  db: VercelPgDatabase<typeof schema>,
  interviewHash: string,
  organiaztionId: number
) {
  const interview = await db.query.interviewsTable.findFirst({
    where: and(
      eq(interviewsTable.hash, interviewHash),
      eq(interviewsTable.organizationId, organiaztionId)
    ),
    with: {
      problem: true,
      submissions: {
        with: {
          language: true,
        },
      },
      transcriptions: true,
      organization: true,
    },
  });

  return interview;
}

export async function insertInterview(
  db: VercelPgDatabase<typeof schema>,
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
      organizationsTable,
      eq(interviewsTable.organizationId, organizationsTable.id)
    )
    .leftJoin(usersTable, eq(usersTable.organizationId, organizationsTable.id))
    .leftJoin(problemsTable, eq(problemsTable.id, interviewsTable.problemId))
    .leftJoin(submissionsTable, eq(submissionsTable.interviewId, interviewsTable.id))
    .where(eq(usersTable.externalId, userId));
}

export async function getUpcomingInterviews(
  db: VercelPgDatabase<Record<string, never>>,
  userId: string
) {
  return await db
    .select()
    .from(interviewsTable)
    .leftJoin(
      organizationsTable,
      eq(interviewsTable.organizationId, organizationsTable.id)
    )
    .leftJoin(usersTable, eq(usersTable.organizationId, organizationsTable.id))
    .leftJoin(transcriptionsTable, eq(transcriptionsTable.interviewId, interviewsTable.id))
    .leftJoin(problemsTable, eq(problemsTable.id, interviewsTable.problemId))
    .leftJoin(submissionsTable, eq(submissionsTable.interviewId, interviewsTable.id))
    .where(
      and(
        eq(usersTable.externalId, userId),
        eq(count(transcriptionsTable.interviewId), 0)
      )
    );
}