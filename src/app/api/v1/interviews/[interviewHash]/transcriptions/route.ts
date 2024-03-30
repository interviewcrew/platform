import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { transcriptionsTable } from "@/db/schema";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import {
  insertTranscriptions,
} from "@/db/repositories/transcriptionRepository";
import { getInterviewByHashId } from "@/db/repositories/interviewRepository";
import * as schema from "@/db/schema";
import {
  getOrganizationWithErrorHandling,
  getUserWithErrorHandling,
} from "@/lib/api-helpers/auth";
import { withErrorHandler } from "@/lib/api-helpers/error-handler";
import { OptionsHandler } from "@/lib/api-helpers/shared";

export const POST = withErrorHandler(createTranscription);

async function createTranscription(
  request: NextRequest,
  { params }: { params: { interviewHash: string } }
) {
  const requestSchema = z.object({
    transcriptions: z.array(
      createInsertSchema(transcriptionsTable).omit({
        id: true,
        interviewId: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
      })
    ),
  });

  const { userId: userExternalId } = auth();

  if (!userExternalId) {
    return NextResponse.json(
      { error: "User is not logged in" },
      { status: 401 }
    );
  }

  let requestParsed = requestSchema.parse(await request.json());

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

  insertTranscriptions(db, requestParsed.transcriptions, interview.id, user.id);

  return NextResponse.json({ status: "Successful" });
}

// This is to solve the bug in NextJS where if you don't have a GET route,
// It will throw a CORS error. Because GET route is also handling the OPTIONS request
export const OPTIONS = OptionsHandler;