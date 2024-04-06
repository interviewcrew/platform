import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { interviewsTable } from "@/db/schema";
import { createInsertSchema } from "drizzle-zod";
import {
  Interview,
  getInterviewByHashId,
  insertInterview,
} from "@/db/repositories/interviewRepository";
import { withErrorHandler } from "@/lib/api-helpers/error-handler";
import {
  getOrganizationWithErrorHandling,
  getUserWithErrorHandling,
} from "@/lib/api-helpers/auth";
import { OptionsHandler } from "@/lib/api-helpers/shared";
import { insertJobListing } from "@/db/repositories/jobListingRepository";
import { insertCandidate } from "@/db/repositories/candidateRepository";

export const POST = withErrorHandler(createInterview);

async function createInterview(request: NextRequest) {
  const requestSchema = createInsertSchema(interviewsTable).omit({
    id: true,
    problemId: true,
    organizationId: true,
    createdAt: true,
    updatedAt: true,
  });

  const { userId: userExternalId } = auth();

  if (!userExternalId) {
    return NextResponse.json(
      { error: "User is not logged in" },
      { status: 401 }
    );
  }

  const interviewParams = requestSchema.parse(await request.json());

  const user = await getUserWithErrorHandling(userExternalId);

  const organization = await getOrganizationWithErrorHandling(
    user.organizationId
  );

  return getOrInsertInterview(interviewParams, organization.id);
}

async function getOrInsertInterview(
  interviewDto: Interview,
  organizationId: number
) {
  let interview = await getInterviewByHashId(interviewDto.hash, organizationId);

  if (interview) {
    return NextResponse.json(interview, { status: 200 });
  }

  const jobListing = (await insertJobListing({ organizationId }))[0];
  const candidate = (await insertCandidate({ organizationId }))[0];
  const interviews = await insertInterview(
    interviewDto,
    organizationId,
    jobListing.id,
    candidate.id
  );

  interview = interviews[0];

  return NextResponse.json(interview, { status: 201 });
}

// This is to solve the bug in NextJS where if you don't have a GET route,
// It will throw a CORS error. Because GET route is also handling the OPTIONS request
export const OPTIONS = OptionsHandler;
