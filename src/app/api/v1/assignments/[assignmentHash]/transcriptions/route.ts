import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import {
  assignmentsTable,
  companiesTable,
  usersTable,
  transcriptionsTable,
} from "@/db/schema";
import { VercelPgDatabase, drizzle } from "drizzle-orm/vercel-postgres";
import { eq, and } from "drizzle-orm";
import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";

type Transcription = {
  speaker: string;
  transcription: string;
  order: number;
};

export async function POST(
  request: NextRequest,
  { params }: { params: { assignmentHash: string } }
) {
  const requestSchema = z.object({
    transcriptions: z.array(
      createInsertSchema(transcriptionsTable).omit({
        id: true,
        assignmentId: true,
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

    const assignments = await getAssignmentFromDB(
      db,
      params.assignmentHash,
      userAuthId
    );

    if (assignments.length === 0) {
      return NextResponse.json(
        { error: "Assignment not found" },
        { status: 404 }
      );
    }

    const userId = assignments[0].users?.id;
    if (!userId) {
      return NextResponse.json(
        { error: "Assignment doesn't blong to the user" },
        { status: 404 }
      );
    }

    insertTranscriptions(db, requestParsed.transcriptions, assignments[0].assignments.id, userId)

    return NextResponse.json({ status: "Successful" });
  } catch (error) {
    return NextResponse.json(
      { error: (error as { message: string }).message },
      { status: 500 }
    );
  }
}
export async function getAssignmentFromDB(
  db: VercelPgDatabase<Record<string, never>>,
  assignmentHash: string,
  userId: string
) {
  return await db
    .select()
    .from(assignmentsTable)
    .leftJoin(companiesTable, eq(assignmentsTable.companyId, companiesTable.id))
    .leftJoin(usersTable, eq(usersTable.companyId, companiesTable.id))
    .where(
      and(
        eq(assignmentsTable.hash, assignmentHash),
        eq(usersTable.authId, userId)
      )
    );
}

async function insertTranscriptions(
  db: VercelPgDatabase<Record<string, never>>,
  transcriptions: Transcription[],
  assignmentId: number,
  userId: number
) {
  await db
    .insert(transcriptionsTable)
    .values(
      transcriptions.map((dialog) => ({
        speaker: dialog.speaker,
        transcription: dialog.transcription,
        order: dialog.order,
        assignmentId: assignmentId,
        userId,
      }))
    )
    .onConflictDoNothing();
}
