"use client";

import Steps, { Step } from "./Steps";
import { CreatorComponentProps } from "./EmptyState";
import JobListingForm from "./JobListingForm";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import JobListingQuestions from "@/components/JobListingQuestions";
import { JobListingListItem } from "@/db/repositories/jobListingRepository";
import { getUpdatedSearchParams } from "@/lib/utils";
import ManageCandidates from "@/components/ManageCandidates";

export default function JobListingManager(props: CreatorComponentProps) {
  const [jobListing, setJobListing] = useState<JobListingListItem>(
    props.jobListing ?? ({} as JobListingListItem)
  );

  const [step, setStep] = useState<number>(
    typeof props.searchParams.step == "string"
      ? parseInt(props.searchParams.step)
      : 1
  );
  const [candidateId, setCandidateId] = useState<number | undefined>(
    typeof props.searchParams.candidateId == "string"
      ? parseInt(props.searchParams.candidateId)
      : undefined
  )
  const [interviewId, setInterviewId] = useState<number | undefined>(
    typeof props.searchParams.interviewId == "string"
      ? parseInt(props.searchParams.interviewId)
      : undefined
  )
  const [steps, setSteps] = useState<Step[]>([
    {
      id: "Step 1",
      name: "Create job listing",
      status: step === 1 ? "current" : "complete",
    },
    {
      id: "Step 2",
      name: "Manage questions",
      status: step === 2 ? "current" : step === 1 ? "upcoming" : "complete",
    },
    {
      id: "Step 3",
      name: "Manage Interviews",
      status: step === 3 ? "current" : "upcoming",
    },
  ]);

  const router = useRouter();

  const cancelCallback = () => {
    router.push(
      getUpdatedSearchParams(props.searchParams, [
        { key: "jobListingId", value: "" },
        { key: "step", value: "" },
      ])
    );
  };

  const doneCallback = async (jobListing: JobListingListItem, step: number) => {
    setJobListing(jobListing);
    router.push(
      getUpdatedSearchParams(props.searchParams, [
        { key: "jobListingId", value: String(jobListing.id) },
        { key: "step", value: String(step + 1) },
      ])
    );
    setStep(step + 1);
  };

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
          organizationId={props.organizationId}
          doneCallback={doneCallback}
          cancelCallback={cancelCallback}
          step={step}
        />
      )}
      {step === 2 && (
        <JobListingQuestions
          jobListing={jobListing}
          userId={props.userId}
          doneCallback={doneCallback}
          cancelCallback={cancelCallback}
          step={step}
        />
      )}
      {step === 3 && (
        <ManageCandidates
          jobListing={jobListing}
          organizationId={props.organizationId}
          doneCallback={doneCallback}
          cancelCallback={cancelCallback}
          step={step}
          searchParams={props.searchParams}
          userId={props.userId}
          allCandidates={props.allCandidates}
          candidateId={candidateId}
          interviewId={interviewId}
        />
      )}
    </>
  );
}
