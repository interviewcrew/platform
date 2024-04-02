import { VercelPgDatabase } from "drizzle-orm/vercel-postgres";
import { candidatesTable, NewCandidate } from "@/db/schema";
import * as schema from "@/db/schema";

export async function insertCandidate(
  db: VercelPgDatabase<typeof schema>,
  candidate: NewCandidate
) {
  return await db
    .insert(candidatesTable)
    .values(candidate)
    .onConflictDoNothing()
    .returning({
      id: candidatesTable.id,
      fullName: candidatesTable.name,
      email: candidatesTable.email,
      about: candidatesTable.about,
      resume: candidatesTable.resume,
    });
}
