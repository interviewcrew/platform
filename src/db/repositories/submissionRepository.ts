import { VercelPgDatabase } from "drizzle-orm/vercel-postgres";
import { submissionsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import * as schema from "@/db/schema";

export type Submission = {
  code: string;
  result: string;
  languageId: number;
};

export async function insertSubmissions(
  db: VercelPgDatabase<typeof schema>,
  submission: Submission,
  interviewId: number,
) {
  await db
    .insert(submissionsTable)
    .values({
      code: submission.code,
      result: submission.result,
      interviewId: interviewId,
      languageId: submission.languageId,
    })
    .onConflictDoNothing();
}

export async function getSubmissionsByInterviewId(
  db: VercelPgDatabase<typeof schema>,
  interviewId: number
) {
  return await db.query.submissionsTable.findMany({
    where: eq(submissionsTable.interviewId, interviewId),
    with: {
      language: {
        columns: {
          id: true,
          name: true,
        }
      },
    },
  });
}
