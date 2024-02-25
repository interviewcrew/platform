import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import {
  transcriptionsTable,
} from "@/db/schema";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import { getInterview } from "@/db/repositories/interviewRepository";
import { Transcription, insertTranscriptions } from "@/db/repositories/transcriptionRepository";


export async function POST(
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

  const { userId: userAuthId } = auth();

  if (!userAuthId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let requestParsed: { transcriptions: Transcription[] };

  try {
    requestParsed = requestSchema.parse(await request.json());
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.issues }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Unknown request validation error" },
      { status: 500 }
    );
  }

  try {
    const db = drizzle(sql);

    const interviews = await getInterview(
      db,
      params.interviewHash,
      userAuthId
    );

    if (interviews.length === 0) {
      return NextResponse.json(
        { error: "Interview not found" },
        { status: 404 }
      );
    }

    const userId = interviews[0].users?.id;
    if (!userId) {
      return NextResponse.json(
        { error: "Interview doesn't blong to the user" },
        { status: 404 }
      );
    }

    insertTranscriptions(db, requestParsed.transcriptions, interviews[0].interviews.id, userId)

    return NextResponse.json({ status: "Successful" });
  } catch (error) {
    return NextResponse.json(
      { error: (error as { message: string }).message },
      { status: 500 }
    );
  }
}
