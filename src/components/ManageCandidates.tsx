import { JobListingListItem } from "@/db/repositories/jobListingRepository";
import { useState } from "react";
import {
  createCandidate,
  createInterview,
  deleteInterview,
  editCandidate,
  updateInterview,
} from "@/app/job-listing-actions";
import { z } from "zod";
import { cn, getUpdatedSearchParams } from "@/lib/utils";
import { CandidateWithInterviews } from "@/db/repositories/candidateRepository";
import { Candidate, Interview, NewInterview } from "@/db/schema";
import { EditIcon, ChevronRightIcon, ExternalLinkIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { EnvelopeIcon, UsersIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { EditableInterviews } from "./EditableInterviews";
import { ConfirmationModal } from "./ConfirmationModal";

export default function ManageCandidates({
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
  setAllCandidates,
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
  setAllCandidates: (allCandidates: CandidateWithInterviews[]) => void;
}) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [deletingInterview, setDeletingInterview] = useState<Interview | null>(
    null
  );

  type CandidateCreationErrors = {
    email?: string[] | undefined;
    name?: string[] | undefined;
    about?: string[] | undefined;
  };

  type CandidateFormErrors = {
    name: string | null;
  };

  const [formErrors, setFormErrors] = useState<CandidateFormErrors>({
    name: null,
  });

  const [creationErrors, setCreationErrors] = useState<CandidateCreationErrors>(
    {}
  );
  const [isSavingCandidate, setIsSavingCandidate] = useState(false);
  const [isSavingInterview, setIsSavingInterview] = useState(false);
  const router = useRouter();

  const [candidate, setCandidate] = useState<CandidateWithInterviews>(
    allCandidates.find((candidate) => candidate.id === candidateId) ??
      ({ organizationId } as CandidateWithInterviews)
  );
  const [interview, setInterview] = useState<Interview>(
    candidate.interviews?.find((interview) => interview.id === interviewId) ??
      ({} as Interview)
  );
  const [isCandidateEditOpen, setIsCandidateEditOpen] = useState(false);

  const cancel = async () => {
    setAllCandidates(allCandidates);
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
        result = (await editCandidate(candidate))[0];
        setAllCandidates(
          allCandidates.map((c) =>
            c.id === result.id ? { ...candidate, ...result } : c
          )
        );
      } else {
        result = (await createCandidate(candidate))[0];
        candidate.interviews = [];
        setAllCandidates([...allCandidates, { ...candidate, ...result }]);
      }

      setCandidate({
        ...candidate,
        ...result,
      });

      setIsCandidateEditOpen(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setCreationErrors(error.flatten().fieldErrors);
      }
    } finally {
      setIsSavingCandidate(false);
    }
  };

  const createNewInterview = async (newInterview: NewInterview) => {
    setIsSavingInterview(true);
    try {
      const result = (await createInterview(newInterview))[0];
      setCandidate({
        ...candidate,
        interviews: [...candidate.interviews, result],
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        setCreationErrors(error.flatten().fieldErrors);
      }
    } finally {
      setIsSavingCandidate(false);
    }
  };

  function validCandidateForCreation(): boolean {
    if (!candidate.name || !candidate.name.trim()) {
      setFormErrors({
        ...formErrors,
        name: "Full name is required.",
      });

      return false;
    }

    return true;
  }

  async function handleConfirmDeleteInterview(): Promise<void> {
    await deleteInterview(deletingInterview!);

    setCandidate({
      ...candidate,
      interviews: candidate.interviews.filter(
        (inter) => inter.id !== deletingInterview!.id
      ),
    });

    setModalOpen(false);
    setDeletingInterview(null);
  }

  const handleSaveInterview = async (interview: Interview) => {
    setIsSavingInterview(true);
    try {
      let result: Interview;

      if (interview.id !== undefined) {
        result = (await updateInterview(interview as Interview))[0];
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
          {allCandidates.length > 0 && (
            <legend className="text-base font-semibold leading-6 text-gray-900">
              Candidates
              <span className="text-sm text-gray-500">
                {" (" + allCandidates.length + ")"}
              </span>
            </legend>
          )}
          <div className="p-2">
            {allCandidates.length > 0 ? (
              allCandidates.map((candidateItem) =>
                candidateItem.id != candidate.id ? (
                  <button
                    key={candidateItem.id}
                    className={cn(
                      "flex p-4 w-full border-b-2 border-gray-200 hover:bg-gray-100 hover:rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                    )}
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
                    <div className="min-w-0 w-full text-sm leading-6 text-left">
                      <label
                        htmlFor={`candidate-${candidateItem.id}`}
                        className="select-none font-medium text-gray-900"
                      >
                        {candidateItem.name ?? "Anonymous Candidate"}
                      </label>
                    </div>
                    <EditIcon className="h-5 w-5 text-gray-400 font-bold" />
                  </button>
                ) : (
                  <div
                    key={candidateItem.id}
                    className={cn(
                      "relative flex items-start p-4  [&:not(:last-child)]:border-b-2",
                      {
                        "bg-sky-100 border-1 rounded-lg border-sky-400 my-1 -mx-2":
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
                      <ChevronRightIcon className="h-5 w-5 text-gray-400 font-bold" />
                    </div>
                  </div>
                )
              )
            ) : (
              <div className="p-24 h-full w-full flex justify-center items-center rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
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
            <div className="flex">
              <legend className="text-base font-semibold leading-6 text-gray-900 py-2">
                {!candidate.id
                  ? "New Candidate"
                  : candidate.name ?? "Anonymous Candidate"}
                <span className="text-sm text-gray-500">
                  {" (" + (candidate.interviews ?? []).length + " interviews)"}
                </span>
              </legend>
              {candidate.id && (
                <button
                  type="button"
                  className="text-sm font-semibold text-sky-600 hover:bg-gray-100 p-2 rounded-md ml-auto"
                  onClick={() => setIsCandidateEditOpen(!isCandidateEditOpen)}
                >
                  Edit Candidate
                </button>
              )}
            </div>
            {(!candidate.id || isCandidateEditOpen) && (
              <div>
                <div>
                  <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="col-span-6 md:col-span-3">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Full name{" "}
                      </label>
                      <div className="mt-2">
                        <div className="relative mt-2 rounded-md shadow-sm">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <UsersIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </div>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                            placeholder="John Doe"
                            value={candidate.name ?? ""}
                            onChange={(e) => {
                              if (e.target.value) {
                                setFormErrors({ ...formErrors, name: null });
                              }

                              setCandidate({
                                ...candidate,
                                name: e.target.value,
                              });
                            }}
                          />
                        </div>
                        {formErrors && formErrors.name && (
                          <div className="text-red-500 text-sm mt-1">
                            {formErrors.name}
                          </div>
                        )}
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
                        <div className="relative mt-2 rounded-md shadow-sm">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <EnvelopeIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </div>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                            placeholder="you@example.com"
                            value={candidate.email ?? ""}
                            onChange={(e) =>
                              setCandidate({
                                ...candidate,
                                email: e.target.value,
                              })
                            }
                          />
                        </div>
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
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
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
                      "rounded-md bg-gradient-to-r from-sky-600 to-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600",
                      {
                        "cursor-not-allowed": isSavingCandidate,
                      }
                    )}
                    onClick={async (e) => {
                      e.preventDefault();

                      if (!validCandidateForCreation()) {
                        return;
                      }

                      await handleSaveCandidate(candidate);
                    }}
                    disabled={isSavingCandidate}
                  >
                    {candidate.id ? "Update Candidate" : "Create Candidate"}
                  </button>
                </div>
              </div>
            )}
          </form>
          {candidate.id && (
            <div className="border-2 mt-5 shadow-md sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                  Create an interview
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>
                    Paste the link of your{" "}
                    <span className="font-bold">Google Meet</span> interview
                    link to create an interview
                  </p>
                </div>
                <form
                  className="mt-5 sm:flex sm:items-center"
                  onSubmit={async (e) => {
                    e.preventDefault();

                    const form = e.target as HTMLFormElement;
                    const hashInput = form.elements.namedItem(
                      "hash"
                    ) as HTMLInputElement;
                    const hash =
                      hashInput.value.split("/").pop()?.split("?")[0] ?? "";

                    await createNewInterview({
                      candidateId: candidate.id,
                      organizationId,
                      jobListingId: jobListing.id,
                      title:
                        (candidate.name ? candidate.name + " for " : "") +
                        jobListing.title,
                      hash: hash,
                    });

                    hashInput.value = "";
                  }}
                >
                  <div className="w-full sm:max-w-xs">
                    <label htmlFor="hash" className="sr-only">
                      Interview Link
                    </label>
                    <input
                      type="hash"
                      name="hash"
                      id="hash"
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                      placeholder="https://meet.google.com/xxx-xxxx-xxx"
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 sm:ml-3 sm:mt-0 sm:w-auto"
                  >
                    Create interview
                  </button>
                </form>
              </div>
            </div>
          )}
          <div className="mt-8 h-full">
            {candidate?.interviews?.length > 0 && (
              <legend className="my-4 text-base font-semibold leading-6 text-gray-900">
                Interviews
                <span className="text-sm text-gray-500">
                  {" (" + candidate.interviews.length + ")"}
                </span>
              </legend>
            )}
            <div className="">
              {candidate?.interviews?.length > 0 && (
                <EditableInterviews
                  interviews={candidate.interviews}
                  deleteInterviewCallback={async (interview: Interview) => {
                    setDeletingInterview(interview);
                    setModalOpen(true);
                  }}
                  updateInterviewCallback={async (interview: Interview) => {
                    console.log("updateInterviewCallback", interview.title);
                    console.log("updateInterviewCallback", interview.id);

                    await updateInterview(interview);
                  }}
                  clickedOnInterviewCallback={(interview: Interview) => {}}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmDeleteInterview}
      >
        Are you sure you want to delete this item?
      </ConfirmationModal>
    </>
  );
}
