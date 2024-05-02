import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { NewInterview, interviewsTable } from "@/db/schema";
import { createInsertSchema } from "drizzle-zod";
import {
  getInterviewByHashId,
  insertInterviewRepo,
} from "@/db/repositories/interviewRepository";
import { withErrorHandler } from "@/lib/api-helpers/error-handler";
import {
  getUserOrganizationWithErrorHandling,
  getUserWithErrorHandling,
} from "@/lib/api-helpers/auth";
import { OptionsHandler } from "@/lib/api-helpers/shared";
import { getJobListingById } from "@/db/repositories/jobListingRepository";
import {
  getCandidateById,
  insertCandidate,
} from "@/db/repositories/candidateRepository";

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

  const organization = await getUserOrganizationWithErrorHandling(user);

  return getOrInsertInterview(
    { ...interviewParams, organizationId: organization.id },
    organization.id
  );
}

async function getOrInsertInterview(
  interviewDto: NewInterview,
  organizationId: number
) {
  let interview = await getInterviewByHashId(interviewDto.hash, organizationId);

  if (interview) {
    return NextResponse.json(interview, { status: 200 });
  }

  const jobListing = await getJobListingById(
    organizationId,
    interviewDto.jobListingId
  );
  const candidate = await getCandidateById(
    organizationId,
    interviewDto.candidateId
  );

  if (!jobListing) {
    return NextResponse.json(
      { error: "Job Listing not found" },
      { status: 404 }
    );
  }

  if (!candidate) {
    return NextResponse.json({ error: "Candidate not found" }, { status: 404 });
  }
  const interviews = await insertInterviewRepo({
    ...interviewDto,
    organizationId,
    jobListingId: jobListing.id,
    candidateId: candidate.id,
  });

  interview = interviews[0];

  return NextResponse.json(interview, { status: 201 });
}

// This is to solve the bug in NextJS where if you don't have a GET route,
// It will throw a CORS error. Because GET route is also handling the OPTIONS request
export const OPTIONS = OptionsHandler;
