import { VercelPgDatabase } from "drizzle-orm/vercel-postgres";
import { transcriptionsTable } from "@/db/schema";
import * as schema from "@/db/schema";

export type Transcription = {
  speaker: string;
  transcription: string;
  order: number;
};

export async function insertTranscriptions(
  db: VercelPgDatabase<typeof schema>,
  transcriptions: Transcription[],
  interviewId: number,
  userId: number
) {
  await db
    .insert(transcriptionsTable)
    .values(
      transcriptions.map((dialog) => ({
        speaker: dialog.speaker,
        transcription: dialog.transcription,
        order: dialog.order,
        interviewId: interviewId,
        userId,
      }))
    )
    .onConflictDoNothing();
}
