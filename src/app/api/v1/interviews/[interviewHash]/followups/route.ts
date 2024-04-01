import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import OpenAI from "openai";
import * as schema from "@/db/schema";
import {
  getOrganizationWithErrorHandling,
  getUserWithErrorHandling,
} from "@/lib/api-helpers/auth";
import {
  getInterviewByHashIdWithFields,
} from "@/db/repositories/interviewRepository";
import { mergeByCreatedAt } from "@/lib/utils";
import { withErrorHandler } from "@/lib/api-helpers/error-handler";

export const GET = withErrorHandler(getFollowupQuestion);

async function getFollowupQuestion(
  _request: NextRequest,
  { params }: { params: { interviewHash: string } }
) {
  const { userId: userExternalId } = auth();

  if (!userExternalId) {
    return NextResponse.json(
      { error: "User is not logged in" },
      { status: 401 }
    );
  }

  const db = drizzle(sql, { schema });

  const user = await getUserWithErrorHandling(db, userExternalId);

  const organization = await getOrganizationWithErrorHandling(
    db,
    user.organizationId
  );

  const interview = await getInterviewByHashIdWithFields(
    db,
    params.interviewHash,
    organization.id
  );

  if (!interview) {
    return NextResponse.json({ error: "Interview not found" }, { status: 404 });
  }

  const transcriptions: {
    type: "transcription";
    value: schema.Transcription[];
  } = { type: "transcription", value: interview.transcriptions };

  const submissions: { type: "submission"; value: typeof interview.submissions[0][] } = {
    type: "submission",
    value: interview.submissions,
  };

  const interviewDetails = mergeByCreatedAt(transcriptions, submissions);

  const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_API_KEY,
  });

  const interviewSoFar = interviewDetails.reduce((interviewSoFar, item) => {
    if (item.type === "transcription") {
      interviewSoFar += `${item.value.speaker}: ${item.value.transcription}\n`;
    } else if (item.type === "submission") {
      interviewSoFar += `Code of the candidate in ${item.value.language.name}: ${item.value.code}\n \
                         execution results: ${item.value.result}\n`
    }

    return interviewSoFar;
  }, "");

  const followup = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      {
        role: "system",
        content: `You are a highly skilled AI technical interviewer that is an expert in asking follow up questions. \
                  I would like you to read the interview so far plus the codes from the candidate if there are any, and come up with a great follow up question to ask so that we learn more about the candidates skills. \
                  Please consider the level of seniority of the candidate, based on the answers given so far and come up with a follow up question that is suitable for that level of competence.
                  Be concise and clear in your question.`,
      },
      { role: "user", content: interviewSoFar },
    ],
  });

  return NextResponse.json({ followup: followup.choices[0].message.content});
}
