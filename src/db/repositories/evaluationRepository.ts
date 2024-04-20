import { drizzle } from "drizzle-orm/vercel-postgres";
import {
  evaluationsTable,
  evaluationMetricsTable,
  NewEvaluation,
} from "@/db/schema";
import * as schema from "@/db/schema";
import { eq } from "drizzle-orm";
import { sql } from "@vercel/postgres";

export async function getEvaluationMetrics() {
  const db = drizzle(sql, { schema })

  return db.query.evaluationMetricsTable.findMany();
}

export async function getEvaluationMetricByName(
  evaluationMetricTitle: string
) {
  const db = drizzle(sql, { schema });

  return db.query.evaluationMetricsTable.findFirst({
    where: eq(evaluationMetricsTable.name, evaluationMetricTitle),
  });
}

export async function insertEvaluation(
  evaluation: NewEvaluation
) {
  const db = drizzle(sql, { schema });

  return db.insert(evaluationsTable).values(evaluation).returning({
    id: evaluationsTable.id,
    value: evaluationsTable.value,
    evaluationMetricId: evaluationsTable.evaluationMetricId,
    interviewId: evaluationsTable.interviewId,
    createdAt: evaluationsTable.createdAt,
    updatedAt: evaluationsTable.updatedAt, 
  });
}
