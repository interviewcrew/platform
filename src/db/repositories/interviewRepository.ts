import { VercelPgDatabase } from "drizzle-orm/vercel-postgres";
import { interviewsTable } from "@/db/schema";
import { eq, and } from "drizzle-orm";
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
          programmingLanguage: true,
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
  organizationId: number,
  jobAdId: number,
  candidateId: number
) {
  return await db
    .insert(interviewsTable)
    .values({
      ...interview,
      organizationId: organizationId,
      jobAdId: jobAdId,
      candidateId: candidateId,
    })
    .onConflictDoNothing()
    .returning({
      id: interviewsTable.id,
      title: interviewsTable.title,
      hash: interviewsTable.hash,
      organizationId: interviewsTable.organizationId,
      problemId: interviewsTable.problemId,
      jobAdId: interviewsTable.jobAdId,
      candidateId: interviewsTable.candidateId,
      languageId: interviewsTable.languageId,
      createdAt: interviewsTable.createdAt,
      updatedAt: interviewsTable.updatedAt,
    });
}

export async function getAllInterviews(
  db: VercelPgDatabase<typeof schema>,
  organiaztionId: number
) {
  return db.query.interviewsTable.findMany({
    where: eq(interviewsTable.organizationId, organiaztionId),
    with: {
      organization: true,
      problem: true,
      transcriptions: true,
      jobAd: true,
      candidate: true,
      language: true,
      evaluations: {
        with: {
          evaluationMetric: true,
        },
      },
      submissions: {
        with: {
          programmingLanguage: true,
        },
      },
    },
  });
}
