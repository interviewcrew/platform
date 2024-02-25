import { VercelPgDatabase } from "drizzle-orm/vercel-postgres";
import { transcriptionsTable } from "@/db/schema";

export type Transcription = {
  speaker: string;
  transcription: string;
  order: number;
};

export async function insertTranscriptions(
  db: VercelPgDatabase<Record<string, never>>,
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