import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { getInterviewByHashId } from "@/db/repositories/interviewRepository";
import * as schema from "@/db/schema";
import { withErrorHandler } from "@/lib/api-helpers/error-handler";
import {
  getOrganizationWithErrorHandling, getUserWithErrorHandling,
} from "@/lib/api-helpers/auth";

export const GET = withErrorHandler(getInterview);

async function getInterview(
  _request: NextRequest,
  { params }: { params: { interviewHash: string } }
) {
  const { userId: userExternalId } = auth();

  if (!userExternalId) {
    return NextResponse.json({ error: "User is not logged in" }, { status: 401 });
  }

  const db = drizzle(sql, { schema });

  const user = await getUserWithErrorHandling(db, userExternalId);

  const organization = await getOrganizationWithErrorHandling(
    db,
    user.organizationId
  );

  let interview = await getInterviewByHashId(
    db,
    params.interviewHash,
    organization.id
  );

  if (!interview) {
    return NextResponse.json({ error: "Interview not found" }, { status: 404 });
  }

  return NextResponse.json(interview);
}
