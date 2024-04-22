import { drizzle } from "drizzle-orm/vercel-postgres";
import { QueryResult, sql } from "@vercel/postgres";
import { Question, NewQuestion, questionsTable } from "@/db/schema";
import * as schema from "@/db/schema";
import { eq } from "drizzle-orm";

export async function deleteQuestion(
  question: Question
): Promise<QueryResult<never>> {
  const db = drizzle(sql, { schema });

  return db.delete(questionsTable).where(eq(questionsTable.id, question.id));
}

export async function updateQuestion(
  question: Question
): Promise<Question[]> {
  const db = drizzle(sql, { schema });

  return db
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
}

export async function addQuestion(question: NewQuestion): Promise<Question[]> {
  const db = drizzle(sql, { schema });

  return db
    .insert(questionsTable)
    .values(question)
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
