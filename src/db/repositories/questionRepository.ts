import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import { Question, NewQuestion, questionsTable } from "@/db/schema";
import * as schema from "@/db/schema";
import { eq, inArray } from "drizzle-orm";

export async function deleteQuestions(questionIds: number[]): Promise<boolean> {
  const db = drizzle(sql, { schema });

  await db
    .delete(questionsTable)
    .where(inArray(questionsTable.id, questionIds));

  return true;
}

export async function updateQuestion(
  question: Question
): Promise<Question | undefined> {
  const db = drizzle(sql, { schema });

  const updatedQuestions = await db
    .update(questionsTable)
    .set({
      question: question.question,
    })
    .where(eq(questionsTable.id, question.id))
    .returning({
      id: questionsTable.id,
      createdAt: questionsTable.createdAt,
      updatedAt: questionsTable.updatedAt,
      jobListingId: questionsTable.jobListingId,
      interviewId: questionsTable.interviewId,
      userId: questionsTable.userId,
      question: questionsTable.question,
      isGenerated: questionsTable.isGenerated,
    });

  return updatedQuestions[0];
}

export async function addQuestionsToJobListing(
  questions: NewQuestion[]
): Promise<Question[]> {
  const db = drizzle(sql, { schema });

  return db
    .insert(questionsTable)
    .values(questions)
    .onConflictDoNothing()
    .returning({
      id: questionsTable.id,
      createdAt: questionsTable.createdAt,
      updatedAt: questionsTable.updatedAt,
      jobListingId: questionsTable.jobListingId,
      interviewId: questionsTable.interviewId,
      userId: questionsTable.userId,
      question: questionsTable.question,
      isGenerated: questionsTable.isGenerated,
    });
}
