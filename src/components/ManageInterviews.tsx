import { JobListingListItem } from "@/db/repositories/jobListingRepository";
import { useState } from "react";
import {
  createCandidate,
  createInterview,
  editCandidate,
  editInterview,
  editJobListing,
} from "@/app/job-listing-actions";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { CandidateWithInterviews } from "@/db/repositories/candidateRepository";
import { Candidate, Interview, NewCandidate, NewInterview } from "@/db/schema";
import {
  InterviewWithRelations,
  insertInterview,
} from "@/db/repositories/interviewRepository";

const getCandidateWithInterviews = (jobListing: JobListingListItem) => {
  const candidatesWithInterviewsMap = jobListing.interviews.reduce(
    (candidate, interview) => {
      const candidateWithInterviews = candidate.get(interview.candidateId) ?? {
        ...interview.candidate,
        interviews: [],
      };

      candidateWithInterviews.interviews.push(interview);

      return candidate.set(interview.candidateId, candidateWithInterviews);
    },
    new Map<number, CandidateWithInterviews>()
  );
  return Array.from(candidatesWithInterviewsMap.values());
};

export default function ManageInterviews({
  jobListing,
  candidateId,
  organizationId,
  step,
  doneCallback,
  cancelCallback,
}: {
  jobListing: JobListingListItem;
  candidateId: number | null;
  organizationId: number;
  step: number;
  doneCallback: (jobListing: JobListingListItem, step: number) => void;
  cancelCallback: () => void;
}) {
  type CandidateCreationErrors = {
    email?: string[] | undefined;
    name?: string[] | undefined;
    about?: string[] | undefined;
  };

  const [creationErrors, setCreationErrors] = useState<CandidateCreationErrors>(
    {}
  );
  const [isSavingCandidate, setIsSavingCandidate] = useState(false);
  const [candidates, setCandidates] = useState<CandidateWithInterviews[]>(
    getCandidateWithInterviews(jobListing)
  );
  const [interview, setInterview] = useState<Interview | NewInterview>();
  const [isSavingInterview, setIsSavingInterview] = useState(false);

  const emptyCandidate: NewCandidate = {
    name: "",
    email: "",
    about: "",
    organizationId: organizationId,
  };

  const [candidate, setCandidate] = useState<
    CandidateWithInterviews | NewCandidate
  >(
    candidateId
      ? candidates.find((candidate) => candidate.id === candidateId) ??
          emptyCandidate
      : emptyCandidate
  );

  const handleSaveCandidate = async (
    candidate: CandidateWithInterviews | NewCandidate
  ) => {
    setIsSavingCandidate(true);
    try {
      let result: Candidate;

      if (candidate.id !== undefined) {
        result = (await editCandidate(candidate as CandidateWithInterviews))[0];
      } else {
        result = (await createCandidate(candidate))[0];
      }

      setCandidate({
        ...candidate,
        ...result,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        setCreationErrors(error.flatten().fieldErrors);
      }
    } finally {
      setIsSavingCandidate(false);
    }
  };

  const handleSaveInterview = async (interview: Interview | NewInterview) => {
    setIsSavingInterview(true);
    try {
      let result: Interview;

      if (interview.id !== undefined) {
        result = (await editInterview(interview as Interview))[0];
      } else {
        result = (await createInterview(interview))[0];
        setCandidate({
          ...candidate,
          interviews: [...candidate.interviews, result],
        });
      }

      setInterview(result);

      doneCallback(result, step);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setCreationErrors(error.flatten().fieldErrors);
      }
    } finally {
      setIsSavingCandidate(false);
    }
  };

  return (
    <>
      <div className="mt-6">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Manage Interviews
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Here you can manage the interviews for this job listing. You can add
          candidates to the job listing and add interviews to the candidates.
        </p>
      </div>
      <div className="grid grid-cols grid-cols-2">
        <form>
          <div>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-6 md:col-span-3">
                <label
                  htmlFor="full-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name <span className="text-gray-400">(optional)</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="senioirty"
                    id="seniority"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder='e.g. "Senior", "Staff", "Any", etc.'
                    value={candidates.seniority ?? ""}
                    onChange={(e) =>
                      setCandidates({
                        ...candidates,
                        seniority: e.target.value,
                      })
                    }
                  />
                  {creationErrors && creationErrors.seniority && (
                    <div className="text-red-500 text-sm mt-1">
                      {creationErrors.seniority.join(", ")}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-span-6 md:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Position <span className="text-gray-400">(optional)</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="position"
                    id="position"
                    autoComplete="position"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder='e.g. "Backend Engineer" or "DevOps Engineer"'
                    value={candidates.position ?? ""}
                    onChange={(e) =>
                      setCandidates({
                        ...candidates,
                        position: e.target.value,
                      })
                    }
                  />
                  {creationErrors && creationErrors.position && (
                    <div className="text-red-500 text-sm mt-1">
                      {creationErrors.position.join(", ")}
                    </div>
                  )}
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  JobAd Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    rows={10}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Paste your jobAd here."
                    value={candidates.description ?? ""}
                    onChange={(e) =>
                      setCandidates({
                        ...candidates,
                        description: e.target.value,
                      })
                    }
                  />
                  {creationErrors && creationErrors.description && (
                    <div className="text-red-500 text-sm mt-1">
                      {creationErrors.description.join(", ") == "Required"
                        ? "Description is required"
                        : creationErrors.description.join(", ")}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-4">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-200 py-2 px-3 rounded-md"
              onClick={cancelCallback}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={cn(
                "rounded-md bg-gradient-to-r from-sky-600 to-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
                {
                  "cursor-not-allowed": isSavingCandidate,
                }
              )}
              onClick={async () => await handleSave(candidates, !jobListing)}
              disabled={isSavingCandidate}
            >
              Save and Continue
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
