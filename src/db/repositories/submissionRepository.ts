import { drizzle } from "drizzle-orm/vercel-postgres";
import { submissionsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import * as schema from "@/db/schema";
import { sql } from "@vercel/postgres";

export type Submission = {
  code: string;
  result: string;
  languageId: number;
};

export async function insertSubmissions(
  submission: Submission,
  interviewId: number
) {
  const db = drizzle(sql, { schema });

  return db
    .insert(submissionsTable)
    .values({
      code: submission.code,
      result: submission.result,
      interviewId: interviewId,
      programmingLanguageId: submission.languageId,
    })
    .onConflictDoNothing();
}

export async function getSubmissionsByInterviewId(
  interviewId: number
) {
  const db = drizzle(sql, { schema });

  return db.query.submissionsTable.findMany({
    where: eq(submissionsTable.interviewId, interviewId),
    with: {
      programmingLanguage: {
        columns: {
          id: true,
          name: true,
        },
      },
    },
  });
}
