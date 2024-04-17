import { insertEvaluation } from "@/db/repositories/evaluationRepository";
import { InterviewWithRelations } from "@/db/repositories/interviewRepository";
import { Evaluation, EvaluationMetric } from "@/db/schema";
import { getEvaluationAndStoreInDB as getInterviewEvaluation } from "@/lib/openai/client";
import * as HeroIcons from "@heroicons/react/20/solid";
import React from "react";
import { EvaluationMarkdown } from "@/components/EvaluationMarkdown";

export type ComponentStyle = {
  backgroundColor: string;
  color: string;
};

export const colors: {
  [key: string]: {
    style: ComponentStyle;
    icon: {
      name: "CheckCircleIcon" | "XCircleIcon" | "ExclamationTriangleIcon";
      color: string;
    };
  };
} = {
  Highlights: {
    style: {
      backgroundColor: "#f0fdf4",
      color: "#30754a",
    },
    icon: {
      name: "CheckCircleIcon",
      color: "#49de80",
    },
  },
  Lowlights: {
    style: {
      backgroundColor: "#fef2f2",
      color: "#9d2524",
    },
    icon: {
      name: "XCircleIcon",
      color: "#f87171",
    },
  },
  Considerations: {
    style: {
      backgroundColor: "#fefce8",
      color: "#895418",
    },
    icon: {
      name: "ExclamationTriangleIcon",
      color: "#facc15",
    },
  },
};

export async function EvaluationSection({
  evaluationMetric,
  evaluation,
  interview,
}: {
  evaluationMetric: EvaluationMetric;
  evaluation: Evaluation | undefined;
  interview: InterviewWithRelations;
}) {
  const { ...icons } = HeroIcons;

  if (!evaluation) {
    try {
      const evaluationText = await getInterviewEvaluation(
        evaluationMetric,
        interview
      );

      evaluation = (
        await insertEvaluation({
          evaluationMetricId: evaluationMetric.id,
          interviewId: interview.id,
          value: evaluationText,
        })
      )[0];
    } catch (e) {
      if (e instanceof Error) return <div>Error: {e.message}</div>;
      return <div>Error: Something went wrong. We are working on it.</div>;
    }
  }

  const Icon = icons[colors[evaluationMetric.name]?.icon.name];

  return (
    <div
      className="rounded-md p-4"
      style={colors[evaluationMetric.name]?.style}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon
            className="h-7 w-7"
            style={{ color: colors[evaluationMetric.name]?.icon.color }}
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3
            className="text-xl font-bold "
            style={colors[evaluationMetric.name]?.style}
          >
            {evaluationMetric?.name}
          </h3>
          <div className="-ml-4 pr-3 mt-2 text-sm">
            <EvaluationMarkdown
              type={evaluationMetric.name}
              value={evaluation.value}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
