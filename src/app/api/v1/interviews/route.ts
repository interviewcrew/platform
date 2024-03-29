import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { interviewsTable } from "@/db/schema";
import { VercelPgDatabase, drizzle } from "drizzle-orm/vercel-postgres";
import { createInsertSchema } from "drizzle-zod";
import {
  Interview,
  getInterviewByHashId,
  insertInterview,
} from "@/db/repositories/interviewRepository";
import * as schema from "@/db/schema";
import {
  withErrorHandler,
} from "@/lib/api-helpers/error-handler";
import {
  getOrganizationWithErrorHandling, getUserWithErrorHandling,
} from "@/lib/api-helpers/auth";
import { OptionsHandler } from "@/lib/api-helpers/shared";

export const POST = withErrorHandler(createInterview);

export async function createInterview(request: NextRequest) {
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

  const db = drizzle(sql, { schema });

  const user = await getUserWithErrorHandling(db, userExternalId);

  const organization = await getOrganizationWithErrorHandling(
    db,
    user.organizationId
  );

  return getOrInsertInterview(db, interviewParams, organization.id);
}

async function getOrInsertInterview(
  db: VercelPgDatabase<typeof schema>,
  interviewDto: Interview,
  organizationId: number
) {
  let interview = await getInterviewByHashId(
    db,
    interviewDto.hash,
    organizationId
  );

  if (interview) {
    return NextResponse.json(interview, { status: 200 });
  }

  const interviews = await insertInterview(
    db,
    interviewDto,
    organizationId
  );

  interview = interviews[0];

  return NextResponse.json(interview, { status: 201 });
}

// This is to solve the bug in NextJS where if you don't have a GET route,
// It will throw a CORS error. Because GET route is also handling the OPTIONS request
export const OPTIONS = OptionsHandler;
