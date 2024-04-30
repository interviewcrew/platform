import { drizzle } from "drizzle-orm/vercel-postgres";
import { QueryResult, sql } from "@vercel/postgres";
import { Interview, NewInterview, interviewsTable } from "@/db/schema";
import { eq, and, asc } from "drizzle-orm";
import * as schema from "@/db/schema";
import { JobListingListItem } from "./jobListingRepository";

export type InterviewFields = {
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
): Promise<InterviewWithRelations | undefined> {
  const db = drizzle(sql, { schema });

  return db.query.interviewsTable.findFirst({
    where: and(
      eq(interviewsTable.hash, interviewHash),
      eq(interviewsTable.organizationId, organiaztionId)
    ),
    with: {
      organization: true,
      problem: true,
      transcriptions: true,
      jobListing: {
        with: {
          questions: true,
        },
      },
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

export async function deleteInterviewRepo(
  interview: Interview
): Promise<QueryResult<never>> {
  const db = drizzle(sql, { schema });

  return db.delete(interviewsTable).where(eq(interviewsTable.id, interview.id));
}

export async function insertInterviewRepo(interview: NewInterview) {
  const db = drizzle(sql, { schema });

  return db
    .insert(interviewsTable)
    .values(interview)
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

export async function updateInterviewRepo(interview: Interview) {
  const db = drizzle(sql, { schema });

  return (
    db
      .update(interviewsTable)
      // TODO: why seting the whole interview breaks the code??
      // .set(interview)
      .set({
        title: interview.title,
      })
      .where(eq(interviewsTable.id, interview.id))
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
      })
  );
}

export async function getAllInterviews(organiaztionId: number) {
  const db = drizzle(sql, { schema });

  return db.query.interviewsTable.findMany({
    where: eq(interviewsTable.organizationId, organiaztionId),
    orderBy: [asc(interviewsTable.createdAt)],
    with: {
      organization: true,
      problem: true,
      transcriptions: true,
      jobListing: {
        with: {
          questions: true,
        },
      },
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

export type InterviewWithRelations = Awaited<
  ReturnType<typeof getAllInterviews>
>[0];
