"use client";

import Steps, { Step } from "./Steps";
import { CreatorComponentProps } from "./EmptyState";
import JobListingForm from "./JobListingForm";
import { useEffect, useState } from "react";
import { createJobListing, editJobListing } from "@/app/job-listing-actions";
import { getUpdatedSearchParams } from "@/lib/utils";
import Link from "next/link";
import { z } from "zod";
import { useRouter } from "next/navigation";
import JobListingQuestions from "./JobListingQuestions";
import { JobListingListItem } from "@/db/repositories/jobListingRepository";

export default function JobListingManager(props: CreatorComponentProps) {
  const [jobListing, setJobListing] = useState<JobListingListItem>(
    props.jobListing ?? ({} as JobListingListItem)
  );
  const [shouldApplyJobListing, setShouldApplyJobListing] = useState(false);
  const [creationErrors, setActionErrors] = useState<{
    title?: string[] | undefined;
    description?: string[] | undefined;
    organizationId?: string[] | undefined;
    position?: string[] | undefined;
    seniority?: string[] | undefined;
  }>({});
  const [step, setStep] = useState<number>(
    typeof props.searchParams.step == "string"
      ? parseInt(props.searchParams.step)
      : 1
  );
  const [steps, setSteps] = useState<Step[]>([
    {
      id: "Step 1",
      name: "Create job listing",
      status: step === 1 ? "current" : "complete",
      onClick: () => {
        setShouldApplyJobListing(true);
      },
    },
    {
      id: "Step 2",
      name: "Manage questions",
      status: step === 2 ? "current" : step === 1 ? "upcoming" : "complete",
      onClick: () => {},
    },
    {
      id: "Step 3",
      name: "Practice questions",
      status: step === 3 ? "current" : "upcoming",
      onClick: () => {},
    },
  ]);

  const router = useRouter();

  useEffect(() => {
    setSteps([
      {
        ...steps[0],
        status: step === 1 ? "current" : "complete",
      },
      {
        ...steps[1],
        status: step === 2 ? "current" : step === 1 ? "upcoming" : "complete",
      },
      {
        ...steps[2],
        status: step === 3 ? "current" : "upcoming",
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  useEffect(() => {
    const create = async () => {
      try {
        const result = await createJobListing({
          ...jobListing,
          organizationId: props.organizationId,
        });

        setJobListing(result);

        router.push(
          getUpdatedSearchParams(props.searchParams, [
            { key: "step", value: "2" },
          ])
        );
        setStep(2);
      } catch (error) {
        if (error instanceof z.ZodError) {
          setActionErrors(error.flatten().fieldErrors);
        }
      } finally {
        setShouldApplyJobListing(false);
      }
    };

    const update = async () => {
      try {
        const result = await editJobListing({
          ...jobListing,
          organizationId: props.organizationId,
        });

        setJobListing(result);

        router.push(
          getUpdatedSearchParams(props.searchParams, [
            { key: "step", value: "2" },
          ])
        );
        setStep(2);
      } catch (error) {
        if (error instanceof z.ZodError) {
          setActionErrors(error.flatten().fieldErrors);
        }
      } finally {
        setShouldApplyJobListing(false);
      }
    };

    if (shouldApplyJobListing && props.jobListing == undefined) {
      create();
    } else if (shouldApplyJobListing && props.jobListing != undefined) {
      update();
    }
  }, [
    jobListing,
    shouldApplyJobListing,
    creationErrors,
    router,
    props.jobListing,
    props.organizationId,
    props.searchParams,
  ]);

  return (
    <>
      <Steps
        steps={steps}
        searchParams={props.searchParams}
        onClickCallBack={(step: number) => {
          setStep(step);
        }}
      />
      {step === 1 && (
        <JobListingForm
          jobListing={jobListing}
          setJobListing={setJobListing}
          creationErrors={creationErrors}
        />
      )}
      {step === 2 && (
        <JobListingQuestions jobListing={jobListing} userId={props.userId} />
      )}
      <div className="mt-6 flex items-center justify-end gap-x-4">
        <Link
          href={`/dashboard/job-listings`}
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-200 py-2 px-3 rounded-md"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="rounded-md bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={steps[step - 1].onClick}
        >
          Save and Continue
        </button>
      </div>
    </>
  );
}
