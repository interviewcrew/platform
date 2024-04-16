"use server";

import {
  CandidateWithInterviews,
  getCandidates,
  insertCandidate,
  updateCandidate,
} from "@/db/repositories/candidateRepository";
import {
  insertInterview,
  updateInterview,
} from "@/db/repositories/interviewRepository";
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
  Candidate,
  Interview,
  JobListing,
  NewCandidate,
  NewInterview,
  NewJobListing,
  NewQuestion,
  Question,
  candidatesTable,
  interviewsTable,
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

export async function createCandidate(candidate: NewCandidate) {
  if (candidate.organizationId === undefined) {
    throw new Error("Organization ID is required");
  }

  return await insertCandidate(candidate);
}

export async function editCandidate(candidate: Candidate) {
  if (candidate.id === undefined) {
    throw new Error("Candidate ID is required");
  }

  return updateCandidate(candidate);
}

export async function createInterview(interview: NewInterview) {
  if (interview.jobListingId === undefined) {
    throw new Error("Job Listing ID is required");
  }

  if (interview.candidateId === undefined) {
    throw new Error("Candidate ID is required");
  }

  const requestSchema = createInsertSchema(interviewsTable, {
    hash: z.string().trim().min(5, "Hash must be at least 5 characters long"),
  }).omit({
    createdAt: true,
    updatedAt: true,
  });

  const validatedFields = requestSchema.parse(interview);
  return insertInterview(validatedFields);
}

export async function editInterview(interview: Interview) {
  if (interview.id === undefined) {
    throw new Error("Interview ID is required");
  }

  if (interview.candidateId === undefined) {
    throw new Error("Candidate ID is required");
  }

  if (interview.jobListingId === undefined) {
    throw new Error("Job Listing ID is required");
  }

  const requestSchema = createInsertSchema(interviewsTable, {
    hash: z.string().trim().min(5, "Hash must be at least 5 characters long"),
  });

  requestSchema.parse(interview);

  interview.updatedAt = new Date();

  return updateInterview(interview);
}

export async function getCandidatesList(search: string) {
  return getCandidates(search);
}