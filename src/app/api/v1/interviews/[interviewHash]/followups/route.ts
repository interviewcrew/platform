import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import {
  getUserOrganizationWithErrorHandling,
  getUserWithErrorHandling,
} from "@/lib/api-helpers/auth";
import { getInterviewByHashIdWithFields } from "@/db/repositories/interviewRepository";
import { withErrorHandler } from "@/lib/api-helpers/error-handler";
import { getFollowupQuestion as getFollowupQuestionFromOpenAI } from "@/lib/openai/client";
import { addQuestion } from "@/db/repositories/questionRepository";

// export const maxDuration = 300;
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

  const user = await getUserWithErrorHandling(userExternalId);

  const organization = await getUserOrganizationWithErrorHandling(user);

  const interview = await getInterviewByHashIdWithFields(
    params.interviewHash,
    organization.id
  );

  if (!interview) {
    return NextResponse.json({ error: "Interview not found" }, { status: 404 });
  }

  const followup = await getFollowupQuestionFromOpenAI(interview);

  if (followup) {
    addQuestion({
      interviewId: interview.id,
      question: followup,
      isGenerated: true,
      userId: user.id,
    });
  }

  return NextResponse.json({
    followup,
  });
}
