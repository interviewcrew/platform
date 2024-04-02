import { VercelPgDatabase } from "drizzle-orm/vercel-postgres";
import {
  evaluationsTable,
  evaluationMetricsTable,
  NewEvaluation,
} from "@/db/schema";
import * as schema from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getEvaluationMetricByName(
  db: VercelPgDatabase<typeof schema>,
  evaluationMetricTitle: string
) {
  return await db.query.evaluationMetricsTable.findFirst({
    where: eq(evaluationMetricsTable.name, evaluationMetricTitle),
  });
}

export async function insertEvaluation(
  db: VercelPgDatabase<typeof schema>,
  evaluation: NewEvaluation
) {
  return await db.insert(evaluationsTable).values(evaluation).returning({
    id: evaluationsTable.id,
    value: evaluationsTable.value,
    evaluationMetricId: evaluationsTable.evaluationMetricId,
    interviewId: evaluationsTable.interviewId,
    createdAt: evaluationsTable.createdAt,
    updatedAt: evaluationsTable.updatedAt, 
  });
}
