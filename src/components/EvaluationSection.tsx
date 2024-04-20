import { insertEvaluation } from "@/db/repositories/evaluationRepository";
import { InterviewWithRelations } from "@/db/repositories/interviewRepository";
import { Evaluation, EvaluationMetric } from "@/db/schema";
import {
  getFormatedEvaluation,
  getEvaluationAndStoreInDB as getInterviewEvaluation,
} from "@/lib/openai/client";
import React from "react";
import { EvaluationWithMarkdown } from "@/components/EvaluationMarkdown";

export async function EvaluationSection({
  evaluationMetric,
  evaluation,
  interview,
  isDefaultOpen,
}: {
  evaluationMetric: EvaluationMetric;
  evaluation: Evaluation | undefined;
  interview: InterviewWithRelations;
}) {
  let evaluationJson:
    | {
        summary: string;
        upsides: {
          title: string;
          value: string;
        }[];
        downsides: {
          title: string;
          value: string;
        }[];
        areas_for_exploration: {
          title: string;
          value: string;
        }[];
      }
    | undefined;

  if (!evaluation) {
    try {
      const evaluationText = await getInterviewEvaluation(
        evaluationMetric,
        interview
      );

      const evaluationFormatted = await getFormatedEvaluation(evaluationText);

      evaluation = (
        await insertEvaluation({
          evaluationMetricId: evaluationMetric.id,
          interviewId: interview.id,
          value: evaluationText,
          valueFormatted: evaluationFormatted,
        })
      )[0];
    } catch (e) {
      if (e instanceof Error) return <div>Error: {e.message}</div>;
      return <div>Error: Something went wrong. We are working on it.</div>;
    }
  }

  if (evaluation.valueFormatted) {
    try {
      evaluationJson = JSON.parse(evaluation.valueFormatted);
    } catch (e) {
      console.log(
        "Error parsing evaluation json",
        e,
        evaluation.valueFormatted,
        evaluation
      );
    }
  }

  return (
    <div className="text-gray-600">
      {evaluationJson && (
        <div>
          <div className="rounded-md p-4 mb-4 border-grey-100 border-2 shadow-md">
            <h3 className="text-2xl font-bold">📝 Summary</h3>
            <div className="mt-4 text-md pl-8 pr-6 text-justify">
              {evaluationJson.summary}
            </div>
          </div>
          <div className="rounded-md p-4 mb-4 border-grey-100 border-2 shadow-md">
            <h3 className="text-2xl font-bold">✅ Positives</h3>
            <div className="mt-4 text-md pl-8 pr-6 text-justify">
              {evaluationJson.upsides.map((upside, index) => (
                <div key={index}>
                  <h4 className="text-lg font-bold mt-2">{upside.title}</h4>
                  <p className="mt-2">{upside.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-md p-4 mb-4 border-grey-100 border-2 shadow-md">
            <h3 className="text-2xl font-bold">🤔 Considerations</h3>
            <div className="mt-4 text-md pl-8 pr-6 text-justify">
              {evaluationJson.downsides.map((downside, index) => (
                <div key={index}>
                  <h4 className="text-lg font-bold mt-2">{downside.title}</h4>
                  <p className="mt-2">{downside.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-md p-4 mb-4 border-grey-100 border-2 shadow-md">
            <h3 className="text-2xl font-bold">❓ Areas for exploration</h3>
            <div className="mt-4 text-md pl-8 pr-6 text-justify">
              {evaluationJson.areas_for_exploration.map(
                (exploration, index) => (
                  <div key={index}>
                    <h4 className="text-lg font-bold mt-2">
                      {exploration.title}
                    </h4>
                    <p className="mt-2">{exploration.value}</p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
      <EvaluationWithMarkdown value={evaluation.value} isDefaultOpen={evaluationJson == undefined} />
    </div>
  );
}
