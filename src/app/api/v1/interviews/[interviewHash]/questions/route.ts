import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import {
  getOrganizationWithErrorHandling,
  getUserWithErrorHandling,
} from "@/lib/api-helpers/auth";
import { getInterviewByHashIdWithFields } from "@/db/repositories/interviewRepository";
import { withErrorHandler } from "@/lib/api-helpers/error-handler";

export const GET = withErrorHandler(getQuestions);

async function getQuestions(
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

  const organization = await getOrganizationWithErrorHandling(
    user.organizationId
  );

  const interview = await getInterviewByHashIdWithFields(
    params.interviewHash,
    organization.id
  );

  if (!interview) {
    return NextResponse.json({ error: "Interview not found" }, { status: 404 });
  }

  return NextResponse.json({
    questions: interview.jobListing.questions,
  });
}
