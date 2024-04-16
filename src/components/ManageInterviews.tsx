import { JobListingListItem } from "@/db/repositories/jobListingRepository";
import { useState } from "react";
import {
  createCandidate,
  createInterview,
  editCandidate,
  editInterview,
  getCandidatesList,
} from "@/app/job-listing-actions";
import { z } from "zod";
import { cn, getUpdatedSearchParams } from "@/lib/utils";
import { CandidateWithInterviews } from "@/db/repositories/candidateRepository";
import { Candidate, Interview } from "@/db/schema";
import { UsersIcon } from "@heroicons/react/24/outline";
import { EditIcon, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const getCandidateWithInterviews = () => getCandidatesList("");

export default function ManageInterviews({
  jobListing,
  candidateId,
  interviewId,
  organizationId,
  allCandidates,
  step,
  userId,
  searchParams,
  doneCallback,
  cancelCallback,
}: {
  jobListing: JobListingListItem;
  candidateId: number | undefined;
  interviewId: number | undefined;
  organizationId: number;
  allCandidates: CandidateWithInterviews[];
  step: number;
  userId: number;
  searchParams: { [key: string]: string | string[] | undefined };
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
  const [candidates, setCandidates] =
    useState<CandidateWithInterviews[]>(allCandidates);
  const [isSavingInterview, setIsSavingInterview] = useState(false);
  const router = useRouter();

  const [candidate, setCandidate] = useState<CandidateWithInterviews>(
    candidates.find((candidate) => candidate.id === candidateId) ??
      ({ organizationId } as CandidateWithInterviews)
  );
  const [interview, setInterview] = useState<Interview>(
    candidate.interviews?.find((interview) => interview.id === interviewId) ??
      ({} as Interview)
  );

  const cancel = async () => {
    setCandidates(allCandidates);
    setCandidate({ organizationId } as CandidateWithInterviews);
    router.push(
      getUpdatedSearchParams(searchParams, [
        { key: "step", value: step.toString() },
        { key: "candidateId", value: undefined },
      ])
    );
  };

  const handleSaveCandidate = async (candidate: CandidateWithInterviews) => {
    setIsSavingCandidate(true);
    try {
      let result: Candidate;

      if (candidate.id !== undefined) {
        console.log("Editing candidate", candidate);
        result = (await editCandidate(candidate))[0];
        setCandidates(
          candidates.map((c) =>
            c.id === result.id ? { ...candidate, ...result } : c
          )
        );
      } else {
        console.log("Creating candidate", candidate);
        result = (await createCandidate(candidate))[0];
        candidate.interviews = [];
        setCandidates([...candidates, { ...candidate, ...result }]);
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
    console.log("Candidate Created", candidate);
  };

  const handleSaveInterview = async (interview: Interview) => {
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

      // doneCallback(result, step);
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
      <div className="mt-4 grid lg:grid-cols-2 sm:grid-cols">
        <div className="pt-2 h-full border-r border-solid">
          {candidates.length > 0 && (
            <legend className="text-base font-semibold leading-6 text-gray-900">
              Candidates
              <span className="text-sm text-gray-500">
                {" (" + candidates.length + ")"}
              </span>
            </legend>
          )}
          <div className="p-2">
            {candidates.length > 0 ? (
              candidates.map((candidateItem) => (
                <div
                  key={candidateItem.id}
                  className={cn(
                    "relative flex items-start p-4 odd:bg-gray-100",
                    {
                      "odd:bg-sky-100 bg-sky-100 border-1 rounded-lg border-sky-400":
                        candidateItem.id === candidate.id,
                    }
                  )}
                >
                  <div className="min-w-0 flex-1 text-sm leading-6">
                    <label
                      htmlFor={`candidate-${candidateItem.id}`}
                      className="select-none font-medium text-gray-900"
                    >
                      {candidateItem.name ?? "Anonymous Candidate"}
                    </label>
                  </div>
                  <div className="ml-3 flex h-6 items-center">
                    {candidateItem.id === candidate.id ? (
                      <ChevronRightIcon className="h-5 w-5 text-gray-400 font-bold" />
                    ) : (
                      <button
                        onClick={() => {
                          setCandidate(candidateItem);
                          router.push(
                            getUpdatedSearchParams(searchParams, [
                              {
                                key: "candidateId",
                                value: candidateItem.id.toString(),
                              },
                            ])
                          );
                        }}
                      >
                        <EditIcon className="h-5 w-5 text-gray-400 font-bold" />
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full w-full flex justify-center items-center rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                <div className="text-center">
                  <UsersIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <span className="mt-2 block text-sm font-semibold text-gray-900">
                    No candidates created for this job listing
                  </span>
                  <span className="block text-sm font-semibold text-gray-500">
                    Create a candidate to start creating interviews
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="p-2">
          <form>
            <legend className="text-base font-semibold leading-6 text-gray-900">
              {!candidate.id
                ? "New Candidate"
                : candidate.name ?? "Anonymous Candidate"}
              <span className="text-sm text-gray-500">
                {" (" + (candidate.interviews ?? []).length + " interviews)"}
              </span>
            </legend>
            <div>
              <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-6 md:col-span-3">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Name <span className="text-gray-400">(optional)</span>
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="John Doe"
                      value={candidate.name ?? ""}
                      onChange={(e) =>
                        setCandidate({
                          ...candidate,
                          name: e.target.value,
                        })
                      }
                    />
                    {creationErrors && creationErrors.name && (
                      <div className="text-red-500 text-sm mt-1">
                        {creationErrors.name.join(", ")}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-span-6 md:col-span-3">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email <span className="text-gray-400">(optional)</span>
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="email@example.com"
                      value={candidate.email ?? ""}
                      onChange={(e) =>
                        setCandidate({
                          ...candidate,
                          email: e.target.value,
                        })
                      }
                    />
                    {creationErrors && creationErrors.email && (
                      <div className="text-red-500 text-sm mt-1">
                        {creationErrors.email.join(", ")}
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    About <span className="text-gray-400">(optional)</span>
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="about"
                      name="about"
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Candidate's about section"
                      value={candidate.about ?? ""}
                      onChange={(e) =>
                        setCandidate({
                          ...candidate,
                          about: e.target.value,
                        })
                      }
                    />
                    {creationErrors && creationErrors.about && (
                      <div className="text-red-500 text-sm mt-1">
                        {creationErrors.about.join(", ")}
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
                onClick={cancel}
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
                onClick={async (e) => {
                  e.preventDefault();
                  await handleSaveCandidate(candidate);
                }}
                disabled={isSavingCandidate}
              >
                Save and Continue
              </button>
            </div>
          </form>
        </div>{" "}
      </div>
    </>
  );
}
