import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import { interviewsTable } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import * as schema from "@/db/schema";

export type Interview = {
  title: string;
  hash: string;
};
export async function getInterviewByHashId(
  interviewHash: string,
  organiaztionId: number
) {
  const db = drizzle(sql, { schema });

  return db.query.interviewsTable.findFirst({
    where: and(
      eq(interviewsTable.hash, interviewHash),
      eq(interviewsTable.organizationId, organiaztionId)
    ),
  });
}

export async function getInterviewByHashIdWithFields(
  interviewHash: string,
  organiaztionId: number
) {
  const db = drizzle(sql, { schema });

  return db.query.interviewsTable.findFirst({
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
}

export async function insertInterview(
  interview: Interview,
  organizationId: number,
  jobListingId: number,
  candidateId: number
) {
  const db = drizzle(sql, { schema });

  return db
    .insert(interviewsTable)
    .values({
      ...interview,
      organizationId: organizationId,
      jobListingId: jobListingId,
      candidateId: candidateId,
    })
    .onConflictDoNothing()
    .returning({
      id: interviewsTable.id,
      title: interviewsTable.title,
      hash: interviewsTable.hash,
      organizationId: interviewsTable.organizationId,
      problemId: interviewsTable.problemId,
      jobListingId: interviewsTable.jobListingId,
      candidateId: interviewsTable.candidateId,
      languageId: interviewsTable.languageId,
      createdAt: interviewsTable.createdAt,
      updatedAt: interviewsTable.updatedAt,
    });
}

export async function getAllInterviews(organiaztionId: number) {
  const db = drizzle(sql, { schema });

  return db.query.interviewsTable.findMany({
    where: eq(interviewsTable.organizationId, organiaztionId),
    with: {
      organization: true,
      problem: true,
      transcriptions: true,
      jobListing: true,
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

export type InterviewWithItems = Awaited<
  ReturnType<typeof getAllInterviews>
>[0];
