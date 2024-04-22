import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import {
  Question,
  JobListing,
  jobListingsTable,
  questionsTable,
  NewJobListing,
} from "@/db/schema";
import * as schema from "@/db/schema";
import { and, count, eq } from "drizzle-orm";

export type JobListingListItem = Awaited<ReturnType<typeof getJobListings>>[0];

export async function getJobListings(organizationId: number) {
  const db = drizzle(sql, { schema });

  return db.query.jobListingsTable.findMany({
    where: eq(jobListingsTable.organizationId, organizationId),
    with: {
      questions: true,
      interviews: {
        with: {
          candidate: true,
        },
      },
    },
  });
}

export async function getJobListingById(
  organizationId: number,
  id: number
): Promise<JobListingListItem | undefined> {
  const db = drizzle(sql, { schema });

  return db.query.jobListingsTable.findFirst({
    where: and(
      eq(jobListingsTable.organizationId, organizationId),
      eq(jobListingsTable.id, id)
    ),
    with: {
      questions: true,
      interviews: {
        with: {
          candidate: true,
        },
      },
    },
  });
}

export async function getJobListingCount(organizationId: number) {
  const db = drizzle(sql, { schema });

  return db
    .select({ count: count() })
    .from(jobListingsTable)
    .where(eq(jobListingsTable.organizationId, organizationId));
}

export async function insertJobListing(
  jobListing: NewJobListing
): Promise<JobListing[]> {
  const db = drizzle(sql, { schema });

  return db
    .insert(jobListingsTable)
    .values(jobListing)
    .onConflictDoNothing()
    .returning({
      id: jobListingsTable.id,
      title: jobListingsTable.title,
      description: jobListingsTable.description,
      organizationId: jobListingsTable.organizationId,
      position: jobListingsTable.position,
      seniority: jobListingsTable.seniority,
      createdAt: jobListingsTable.createdAt,
      updatedAt: jobListingsTable.updatedAt,
    });
}

export async function updateJobListing(
  jobListing: JobListing
): Promise<JobListing[]> {
  const db = drizzle(sql, { schema });

  return db
    .update(jobListingsTable)
    .set(jobListing)
    .where(eq(jobListingsTable.id, jobListing.id))
    .returning({
      id: jobListingsTable.id,
      title: jobListingsTable.title,
      description: jobListingsTable.description,
      organizationId: jobListingsTable.organizationId,
      position: jobListingsTable.position,
      seniority: jobListingsTable.seniority,
      createdAt: jobListingsTable.createdAt,
      updatedAt: jobListingsTable.updatedAt,
    });
}
