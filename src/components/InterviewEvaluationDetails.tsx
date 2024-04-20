import {
  InterviewWithRelations,
  getAllInterviews,
} from "@/db/repositories/interviewRepository";
import {
  humanizeDuration,
  toHumanTime,
} from "@/lib/utils";
import { Suspense } from "react";
import { EvaluationSection } from "./EvaluationSection";
import { getEvaluationMetrics } from "@/db/repositories/evaluationRepository";
import BackButton from "@/components/BackButton";

function getInterviewDuration(
  interview: Awaited<ReturnType<typeof getAllInterviews>>[0]
): string {
  if (interview.transcriptions.length === 0) return "0s";
  const start = interview.transcriptions[0].createdAt;
  const end =
    interview.transcriptions[interview.transcriptions.length - 1].createdAt;

  return humanizeDuration(start, end);
}

export default async function InterviewEvaluationDetails({
  interview,
  searchParams,
}: {
  interview: InterviewWithRelations;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  searchParams["evaluation"] = undefined;
  const evaluationsMetrics = await getEvaluationMetrics();

  const evaluations = evaluationsMetrics.map((evaluationMetric) => {
    return interview.evaluations.filter(
      (evaluation) => evaluation.evaluationMetricId === evaluationMetric.id
    )[0];
  });

  return (
    <div className="bg-white shadow sm:rounded-lg p-5">
      <div className="flex">
        <BackButton />
        <div className="sm:px-0">
          <h3 className="text-2xl font-bold leading-7 text-gray-600">
            {interview.title?.length > 0
              ? interview.title
              : `Untitled Interview with ${interview.candidate.name}`}
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
