"use client";

import Steps, { Step } from "./Steps";
import { CreatorComponentProps } from "./EmptyState";
import JobListingForm from "./JobListingForm";
import { JobListing } from "@/db/schema";
import { useEffect, useState } from "react";
import { createJobListing } from "@/app/job-listing-actions";

export default function JobListingCreator(props: CreatorComponentProps) {
  const [jobListing, setJobListing] = useState({} as JobListing);
  const [shouldCreateJobListing, setShouldCreateJobListing] = useState(false);
  const [createdJobListing, setCreatedJobListing] = useState<JobListing | null>(
    null
  );
  const [creationErrors, setCreationErrors] = useState<{
    title?: string[] | undefined;
    description?: string[] | undefined;
    organizationId?: string[] | undefined;
    position?: string[] | undefined;
    seniority?: string[] | undefined;
  }>({});
  const [steps, setSteps] = useState<Step[]>([
    {
      id: "Step 1",
      name: "Create job listing",
      status: "current",
      onClick: () => {
        setShouldCreateJobListing(true);
      },
    },
    {
      id: "Step 2",
      name: "Get questions",
      status: "upcoming",
      onClick: () => {},
    },
    {
      id: "Step 3",
      name: "Edit questions",
      status: "upcoming",
      onClick: () => {},
    },
  ]);

  useEffect(() => {
    const create = async () => {
      try {
        const result = await createJobListing({
          ...jobListing,
          organizationId: props.organizationId,
        });

        if ("errors" in result) {
          setCreationErrors(result.errors);
          setShouldCreateJobListing(false);
          return;
        }

        setCreatedJobListing(result);
        setShouldCreateJobListing(false);
        setSteps([
          {...steps[0], status: "complete"},
          {...steps[1], status: "current"},
          {...steps[2], status: "upcoming"},
        ])
      } catch (error) {
        setShouldCreateJobListing(false);
        console.error("Failed to create job listing catch:", error);
      }
    };

    if (shouldCreateJobListing) {
      create();
    }
  }, [
    jobListing,
    props.organizationId,
    shouldCreateJobListing,
    createdJobListing,
    creationErrors,
    steps,
  ]);

  return (
    <>
      <Steps steps={steps} />
      <JobListingForm
        jobListing={jobListing}
        setJobListing={setJobListing}
        creationErrors={creationErrors}
      />
      <div className="mt-6 flex items-center justify-end gap-x-4">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-200 py-2 px-3 rounded-md"
          onClick={() => props.onClose()}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={steps[0].onClick}
        >
          Save and Continue
        </button>
      </div>
    </>
  );
}
