import { Evaluation, EvaluationMetric, Transcription} from "@/db/schema";
import { mergeByCreatedAt } from "@/lib/utils";
import OpenAI from "openai";
import {
  getEvaluationMetricByName,
  insertEvaluation,
} from "@/db/repositories/evaluationRepository";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import * as schema from "@/db/schema";
import { getAllInterviews } from "@/db/repositories/interviewRepository";

export async function getEvaluationAndStoreInDB(evaluationMetric: EvaluationMetric, interview: Awaited<ReturnType<typeof getAllInterviews>>[0]) {
  const transcriptions: {
    type: "transcription";
    value: Transcription[];
  } = { type: "transcription", value: interview.transcriptions };

  const submissions: {
    type: "submission";
    value: (typeof interview.submissions)[0][];
  } = {
    type: "submission",
    value: interview.submissions,
  };

  const interviewDetails = mergeByCreatedAt(transcriptions, submissions);

  const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_API_KEY,
  });

  const interviewText: string = interviewDetails.reduce(
    (interviewSoFar, item) => {
      if (item.type === "transcription") {
        interviewSoFar += `${item.value.speaker}: ${item.value.transcription}\n`;
      } else if (item.type === "submission") {
        interviewSoFar += `Code of the candidate in ${item.value.programmingLanguage.name}: ${item.value.code}\n \
                         execution results: ${item.value.result}\n`;
      }

      return interviewSoFar;
    },
    ""
  );

  const db = drizzle(sql, { schema });

  if (evaluationMetric === undefined) {
    throw new Error("Evaluation metric not found");
  }

  const evaluation = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      {
        role: "system",
        content: evaluationMetric?.prompt ?? "",
      },
      { role: "user", content: interviewText },
    ],
  });

  const evalationText = evaluation.choices[0].message.content;

  if (!evalationText) {
    throw new Error("No highlights found");
  }

  return (
    await insertEvaluation(db, {
      evaluationMetricId: evaluationMetric.id,
      interviewId: interview.id,
      value: evalationText,
    })
  )[0];
}
