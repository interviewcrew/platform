import { getAllInterviews } from "@/db/repositories/interviewRepository";
import {
  getUpdatedSearchParams,
  humanizeDuration,
  toHumanTime,
} from "@/lib/utils";
import Link from "next/link";
import EmptyInterviewDetails from "./EmptyInterviewDetails";
import { ArrowLeft } from "lucide-react";
import { Suspense } from "react";
import { EvaluationSection } from "./EvaluationSection";
import {
  getEvaluationMetrics,
} from "@/db/repositories/evaluationRepository";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import * as schema from "@/db/schema";

function getInterviewDuration(
  interview: Awaited<ReturnType<typeof getAllInterviews>>[0]
): string {
  if (interview.transcriptions.length === 0) return "0s";
  const start = interview.transcriptions[0].createdAt;
  const end =
    interview.transcriptions[interview.transcriptions.length - 1].createdAt;
  console.log(
    interview.transcriptions[0],
    interview.transcriptions[interview.transcriptions.length - 1]
  );
  return humanizeDuration(start, end);
}

export default async function InterviewEvaluationDetails({
  interview,
  searchParams,
}: {
  interview: Awaited<ReturnType<typeof getAllInterviews>>[0] | null;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const db = drizzle(sql, { schema });

  if (!interview) {
    return <EmptyInterviewDetails />;
  }

  searchParams["evaluation"] = undefined;
  const evaluationsMetrics = await getEvaluationMetrics(db);

  const evaluations = evaluationsMetrics.map((evaluationMetric) => {
    return interview.evaluations.filter(
      (evaluation) => evaluation.evaluationMetricId === evaluationMetric.id
    )[0];
  });

  return (
    <div className="bg-white shadow sm:rounded-lg p-5">
      <div className="flex">
        <Link
          href={getUpdatedSearchParams(searchParams, "", "")}
          className="text-cyan-100 rounded-md bg-white bg-opacity-0 px-3 py-2 text-sm font-medium hover:bg-opacity-10"
        >
          <ArrowLeft className="text-gray-600 h-6 w-6" />
        </Link>
        <div className="sm:px-0">
          <h3 className="text-2xl font-bold leading-7 text-gray-600">
            {interview.title}
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            {toHumanTime(interview.createdAt)} - Duration:{" "}
            {getInterviewDuration(interview)}
          </p>
        </div>
      </div>
      <div className="mt-6 flex flex-col space-y-4">
        {evaluations.map((evaluation, index) => (
          <Suspense key={index} fallback={<div>Loading...</div>}>
            <EvaluationSection
              evaluationMetric={evaluationsMetrics[index]}
              evaluation={evaluation}
              interview={interview}
            />
          </Suspense>
        ))}
      </div>
    </div>
  );
}
