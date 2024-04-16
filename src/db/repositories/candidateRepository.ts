import { drizzle } from "drizzle-orm/vercel-postgres";
import {
  candidatesTable,
  Interview,
  NewCandidate,
  Candidate,
} from "@/db/schema";
import * as schema from "@/db/schema";
import { sql } from "@vercel/postgres";
import { and, eq } from "drizzle-orm";

export type CandidateWithInterviews = Candidate & { interviews: Interview[] };

export async function insertCandidate(candidate: NewCandidate) {
  const db = drizzle(sql, { schema });

  return db
    .insert(candidatesTable)
    .values(candidate)
    .onConflictDoNothing()
    .returning({
      id: candidatesTable.id,
      name: candidatesTable.name,
      email: candidatesTable.email,
      about: candidatesTable.about,
      resume: candidatesTable.resume,
      createdAt: candidatesTable.createdAt,
      updatedAt: candidatesTable.updatedAt,
      organizationId: candidatesTable.organizationId,
    });
}

export async function updateCandidate(candidate: Candidate) {
  const db = drizzle(sql, { schema });

  return db
    .update(candidatesTable)
    .set(candidate)
    .where(eq(candidatesTable.id, candidate.id))
    .returning({
      id: candidatesTable.id,
      name: candidatesTable.name,
      email: candidatesTable.email,
      about: candidatesTable.about,
      resume: candidatesTable.resume,
      createdAt: candidatesTable.createdAt,
      updatedAt: candidatesTable.updatedAt,
      organizationId: candidatesTable.organizationId,
    });
}

export async function getCandidateById(
  organizationId: number,
  id: number
): Promise<Candidate | undefined> {
  const db = drizzle(sql, { schema });

  return db.query.candidatesTable.findFirst({
    where: and(
      eq(candidatesTable.organizationId, organizationId),
      eq(candidatesTable.id, id)
    ),
  });
}
