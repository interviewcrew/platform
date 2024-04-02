import { getAllInterviews } from "@/db/repositories/interviewRepository";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";
import {
  getUpdatedSearchParams,
  humanizeDuration,
  mergeByCreatedAt,
  toHumanTime,
} from "@/lib/utils";
import Link from "next/link";
import EmptyInterviewDetails from "./EmptyInterviewDetails";
import { ArrowLeft } from "lucide-react";
import { Evaluation, EvaluationMetric } from "@/db/schema";
import { Suspense } from "react";
import EvaluationSections from "./EvaluationSections";
import { getEvaluationAndStoreInDB } from "@/lib/openai/client";
import { getEvaluationMetricByName } from "@/db/repositories/evaluationRepository";
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

  return humanizeDuration(start, end);
}

async function Highlights({
  evaluationMetric,
  evaluation,
  interview,
}: {
  evaluationMetric: EvaluationMetric;
  evaluation: Evaluation | undefined;
  interview: Awaited<ReturnType<typeof getAllInterviews>>[0];
}) {
  if (!evaluation) {
    try {
      evaluation = await getEvaluationAndStoreInDB(evaluationMetric, interview);
    } catch (e) {
      if (e instanceof Error) return <div>Error: {e.message}</div>;
      return <div>Error: Something went wrong. We are working on it.</div>;
    }
  }

  return (
    <div className="rounded-md bg-green-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <CheckCircleIcon
            className="h-7 w-7 text-green-400"
            aria-hidden="true"
          />
        </div>
        <div>
          <div className="ml-3">
            <h3 className="text-xl font-bold text-green-800">
              {evaluationMetric?.name}
            </h3>
          </div>
          <div className="-ml-4 pr-3">
            <div className="mt-2 text-sm text-green-700">
              <EvaluationSections
                type={"Highlights"}
                value={evaluation.value}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

async function Lowlights({
  evaluationMetric,
  evaluation,
  interview,
}: {
  evaluationMetric: EvaluationMetric;
  evaluation: Evaluation | undefined;
  interview: Awaited<ReturnType<typeof getAllInterviews>>[0];
}) {
  if (!evaluation) {
    try {
      evaluation = await getEvaluationAndStoreInDB(evaluationMetric, interview);
    } catch (e) {
      if (e instanceof Error) return <div>Error: {e.message}</div>;
      return <div>Error: Something went wrong. We are working on it.</div>;
    }
  }

  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-7 w-7 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-xl font-bold text-red-800">
            {evaluationMetric?.name}
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <EvaluationSections type={"Lowlights"} value={evaluation.value} />
          </div>
        </div>
      </div>
    </div>
  );
}

async function Considerations({
  evaluationMetric,
  evaluation,
  interview,
}: {
  evaluationMetric: EvaluationMetric;
  evaluation: Evaluation | undefined;
  interview: Awaited<ReturnType<typeof getAllInterviews>>[0];
}) {
  if (!evaluation) {
    try {
      evaluation = await getEvaluationAndStoreInDB(evaluationMetric, interview);
    } catch (e) {
      if (e instanceof Error) return <div>Error: {e.message}</div>;
      return <div>Error: Something went wrong. We are working on it.</div>;
    }
  }

  return (
    <div className="rounded-md bg-yellow-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon
            className="h-7 w-7 text-yellow-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-xl font-bold text-yellow-800">
            {evaluationMetric?.name}
          </h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>
              <EvaluationSections
                type={"Considerations"}
                value={evaluation.value}
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
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

  const highlights = interview.evaluations.filter(
    (evaluation) => evaluation.evaluationMetric.name === "Highlights"
  )[0];
  const highlightsEvaluationMetric = await getEvaluationMetricByName(
    db,
    "Highlights"
  );

  const lowLights = interview.evaluations.filter(
    (evaluation) => evaluation.evaluationMetric.name === "Lowlights"
  )[0];
  const lowLightsEvaluationMetric = await getEvaluationMetricByName(
    db,
    "Lowlights"
  );

  const considerations = interview.evaluations.filter(
    (evaluation) => evaluation.evaluationMetric.name === "Considerations"
  )[0];
  const considerationsEvaluationMetric = await getEvaluationMetricByName(
    db,
    "Considerations"
  );

  if (
    !highlightsEvaluationMetric ||
    !lowLightsEvaluationMetric ||
    !considerationsEvaluationMetric
  ) {
    return <div>Error: Evaluation metric not found</div>;
  }

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
        <Suspense fallback={<div>Loading...</div>}>
          <Highlights
            evaluation={highlights}
            evaluationMetric={highlightsEvaluationMetric}
            interview={interview}
          />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <Lowlights
            evaluation={lowLights}
            evaluationMetric={lowLightsEvaluationMetric}
            interview={interview}
          />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <Considerations
            evaluation={considerations}
            evaluationMetric={considerationsEvaluationMetric}
            interview={interview}
          />
        </Suspense>
      </div>
    </div>
  );
}
