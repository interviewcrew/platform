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
): Promise<
  | JobListing
  | {
      errors: {
        title?: string[];
        description?: string[];
        organizationId?: string[];
        position?: string[];
        seniority?: string[];
      };
    }
> {
  const requestSchema = createInsertSchema(jobListingsTable, {
    title: z.string().trim().min(1, "Title must be at least 1 character long"),
    description: z.string().trim().min(1),
  }).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });

  const validatedFields = requestSchema.safeParse(JobListing);

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  return (await insertJobListing(validatedFields.data))[0];
}

export async function editJobListing(jobListing: JobListing): Promise<
  | JobListing
  | {
      errors: {
        title?: string[];
        description?: string[];
        organizationId?: string[];
        position?: string[];
        seniority?: string[];
      };
    }
> {
  console.log("Inside Function: ", jobListing);

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

  const validatedFields = requestSchema.safeParse(jobListing);

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  return (
    await updateJobListing({
      ...validatedFields.data,
      id: jobListing.id,
      createdAt: jobListing.createdAt,
      updatedAt: new Date(),
      position: jobListing.position ?? "",
      seniority: jobListing.seniority ?? "",
    })
  )[0];
}
