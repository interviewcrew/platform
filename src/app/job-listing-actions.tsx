"use server";

import {
  JobListingListItem,
  getJobListingById,
  insertJobListing,
  updateJobListing,
} from "@/db/repositories/jobListingRepository";
import {
  addQuestionsToJobListing,
  deleteQuestions,
  updateQuestion,
} from "@/db/repositories/questionRepository";

import {
  JobListing,
  NewJobListing,
  NewQuestion,
  Question,
  jobListingsTable,
} from "@/db/schema";
import { generateJobListingQuestions } from "@/lib/openai/client";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export async function createJobListing(
  JobListing: NewJobListing | { error: JobListing }
): Promise<JobListingListItem> {
  const requestSchema = createInsertSchema(jobListingsTable, {
    title: z.string().trim().min(1, "Title must be at least 1 character long"),
    description: z.string().trim().min(1),
  }).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });

  const validatedFields = requestSchema.parse(JobListing);

  const insertedJobListing = (await insertJobListing(validatedFields))[0];
  const jobListingListItem = await getJobListingById(
    insertedJobListing.organizationId,
    insertedJobListing.id
  );

  if (!jobListingListItem) {
    throw new Error("Job Listing not found");
  }

  return jobListingListItem;
}

export async function editJobListing(
  jobListing: JobListing
): Promise<JobListingListItem> {
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

  const updatedJobListing = (
    await updateJobListing({
      ...validatedFields,
      id: jobListing.id,
      createdAt: jobListing.createdAt,
      updatedAt: new Date(),
      position: jobListing.position ?? "",
      seniority: jobListing.seniority ?? "",
    })
  )[0];

  const jobListingListItem = await getJobListingById(
    updatedJobListing.organizationId,
    updatedJobListing.id
  );

  if (!jobListingListItem) {
    throw new Error("Job Listing not found");
  }

  return jobListingListItem;
}

export async function generateQuestionsForJobListing(
  jobListing: JobListingListItem
): Promise<string[]> {
  const response = await generateJobListingQuestions(jobListing);
  return response;
}

type GeneratedQuestion = NewQuestion & { status: "selected" | "generated" };
type UpdatedQuestion = Question & {
  status: "updated" | "unchanged" | "deleted";
};
export type QuestionWithChange = GeneratedQuestion | UpdatedQuestion;

export async function saveQuestionsForJobListing(
  jobListing: JobListingListItem,
  questions: QuestionWithChange[]
): Promise<Question[]> {
  console.log(jobListing, questions);
  await Promise.all(
    (
      questions.filter(
        (question) => question.status === "updated"
      ) as UpdatedQuestion[]
    ).map(async (question: UpdatedQuestion) => updateQuestion(question))
  );

  if (
    questions.filter((question) => question.status === "deleted").length > 0
  ) {
    await deleteQuestions(
      (
        questions.filter(
          (question) => question.status === "deleted"
        ) as UpdatedQuestion[]
      ).map((question) => question.id)
    );
  }

  if (
    questions.filter((question) => question.status === "selected").length > 0
  ) {
    await addQuestionsToJobListing(
      questions.filter((question) => question.status === "selected")
    );
  }

  const jobListingWithQuestions = await getJobListingById(
    jobListing.organizationId,
    jobListing.id
  );

  return jobListingWithQuestions?.questions ?? [];
}
