import { JobListingListItem } from "@/db/repositories/jobListingRepository";
import { useState } from "react";
import { createJobListing, editJobListing } from "@/app/job-listing-actions";
import { z } from "zod";

export default function JobListingForm({
  jobListing,
  organizationId,
  doneCallback,
  cancelCallback,
}: {
  jobListing: JobListingListItem;
  organizationId: number;
  doneCallback: (jobListing: JobListingListItem) => void;
  cancelCallback: () => void;
}) {
  type CreationErrors = {
    title?: string[] | undefined;
    description?: string[] | undefined;
    organizationId?: string[] | undefined;
    position?: string[] | undefined;
    seniority?: string[] | undefined;
  };

  const [creationErrors, setCreationErrors] = useState<CreationErrors>({});
  const [isRunning, setIsRunning] = useState(false);
  const [jobListingDto, setJobListingDto] = useState<JobListingListItem>(
    jobListing ?? ({} as JobListingListItem)
  );
  const handleSave = async (
    jobListing: JobListingListItem,
    shouldCreate: boolean
  ) => {
    setIsRunning(true);
    try {
      let result: JobListingListItem;

      if (shouldCreate) {
        result = await createJobListing({
          ...jobListing,
          organizationId: organizationId,
        });
      } else {
        result = await editJobListing({
          ...jobListing,
          organizationId: organizationId,
        });
      }

      setJobListingDto(result);
      doneCallback(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setCreationErrors(error.flatten().fieldErrors);
      }
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <>
      <form>
        <div className="mt-6 space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Create Job Listing
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Enter the job listing details below. The details you enter here
              will be used to create a job listing and our AI generated
              interview questions
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Title <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder='e.g. "Senior backend software engineer - Java" or "Senior DevOps Engineer (Remote)"'
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={jobListingDto.title ?? ""}
                    onChange={(e) => {
                      setJobListingDto({
                        ...jobListingDto,
                        title: e.target.value,
                      });
                    }}
                  />
                  {creationErrors && creationErrors.title && (
                    <div className="text-red-500 text-sm mt-1">
                      {creationErrors.title.join(", ") == "Required"
                        ? "Title is required"
                        : creationErrors.title.join(", ")}
                    </div>
                  )}
                </div>
              </div>

              <div className="col-span-6 md:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Seniority <span className="text-gray-400">(optional)</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="senioirty"
                    id="seniority"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder='e.g. "Senior", "Staff", "Any", etc.'
                    value={jobListingDto.seniority ?? ""}
                    onChange={(e) =>
                      setJobListingDto({
                        ...jobListingDto,
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
                    value={jobListingDto.position ?? ""}
                    onChange={(e) =>
                      setJobListingDto({
                        ...jobListingDto,
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
                    value={jobListingDto.description ?? ""}
                    onChange={(e) =>
                      setJobListingDto({
                        ...jobListingDto,
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
        </div>
      </form>
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
          className="rounded-md bg-gradient-to-r from-sky-600 to-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={async () => await handleSave(jobListingDto, !jobListing)}
        >
          Save and Continue
        </button>
      </div>
    </>
  );
}
