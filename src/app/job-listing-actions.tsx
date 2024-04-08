"use server";

import {
  insertJobListing,
  updateJobListing,
} from "@/db/repositories/jobListingRepository";
import { JobListing, NewJobListing, jobListingsTable } from "@/db/schema";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export async function createJobListing(
  JobListing: NewJobListing | { error: JobListing }
): Promise<JobListing> {
  const requestSchema = createInsertSchema(jobListingsTable, {
    title: z.string().trim().min(1, "Title must be at least 1 character long"),
    description: z.string().trim().min(1),
  }).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });

  const validatedFields = requestSchema.parse(JobListing);

  return (await insertJobListing(validatedFields))[0];
}

export async function editJobListing(
  jobListing: JobListing
): Promise<JobListing> {
  if (jobListingsTable.id === undefined) {
    throw new Error("Job Listing ID is required");
  }

  const requestSchema = createInsertSchema(jobListingsTable, {
    id: z.number(),
    title: z.string().trim().min(1, "Title must be at least 1 character long"),
    description: z.string().trim().min(1),
  }).omit({
    createdAt: true,
    updatedAt: true,
  });

  const validatedFields = requestSchema.parse(jobListing);

  return (
    await updateJobListing({
      ...validatedFields,
      id: jobListing.id,
      createdAt: jobListing.createdAt,
      updatedAt: new Date(),
      position: jobListing.position ?? "",
      seniority: jobListing.seniority ?? "",
    })
  )[0];
}
