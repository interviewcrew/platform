import { drizzle } from "drizzle-orm/vercel-postgres";
import { candidatesTable, NewCandidate } from "@/db/schema";
import * as schema from "@/db/schema";
import { sql } from "@vercel/postgres";

export async function insertCandidate(
  candidate: NewCandidate
) {
  const db = drizzle(sql, { schema })

  return db
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
