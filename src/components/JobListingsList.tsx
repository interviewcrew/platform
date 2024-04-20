import { JobListingListItem } from "@/db/repositories/jobListingRepository";
import { getUpdatedSearchParams } from "@/lib/utils";
import { WandIcon } from "lucide-react";
import Link from "next/link";

const people = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  // More people...
];

export default function JobListingsList({
  jobListings,
  searchParams,
}: {
  jobListings: JobListingListItem[];
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const jobListingCandidates = jobListings.reduce(
    (jobListingCandidateMap, jobListing) => {
      const interviewCandidates = jobListing.interviews.reduce(
        (interviewCandidateMap, interview) => {
          const count = interviewCandidateMap.get(interview.candidate.id) ?? 0;
          interviewCandidateMap.set(interview.candidate.id, count + 1);
          return interviewCandidateMap;
        },
        new Map<number, number>()
      );
      jobListingCandidateMap.set(jobListing.id, interviewCandidates.size);
      return jobListingCandidateMap;
    },
    new Map<number, number>()
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Job Listings
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Here are all the job listings for your organization. You can edit
            them, get their questions or create a new one.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            href={getUpdatedSearchParams(searchParams, [
              { key: "step", value: "1" },
              { key: "jobListingId", value: "" },
            ])}
            type="button"
            className="block rounded-md bg-sky-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create Job Listing
          </Link>
        </div>
      </div>
      <div className="-mx-4 mt-8 sm:-mx-0">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
              >
                Title
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Position
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Seniority
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
              >
                # of Candidates
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                # of Interviews
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                <span className="sr-only">Edit</span>
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                <span className="sr-only">Get questsions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {jobListings.map((jobListing) => (
              <tr key={jobListing.id}>
                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                  {jobListing.title}
                  <dl className="font-normal lg:hidden">
                    <dt className="sr-only">Position</dt>
                    <dd className="mt-1 truncate text-gray-700">
                      {jobListing.position ?? "Not specified"}
                    </dd>
                    <dt className="sr-only lg:hidden">Seniority</dt>
                    <dd className="mt-1 truncate text-gray-500">
                      {jobListing.seniority ?? "Not specified"}
                    </dd>
                  </dl>
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                  {jobListing.position ?? "Not specified"}
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                  {jobListing.seniority ?? "Not specified"}
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">
                  {jobListing.interviews.length}
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  {jobListingCandidates.get(jobListing.id) ?? 0}
                </td>
                <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                  <Link
                    href={getUpdatedSearchParams(searchParams, [
                      { key: "jobListingId", value: String(jobListing.id) },
                      { key: "step", value: "1" },
                    ])}
                    className="text-sky-600 hover:text-sky-700"
                  >
                    Edit <span className="sr-only">, {jobListing.title}</span>
                  </Link>
                </td>
                <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                  <Link
                    href={getUpdatedSearchParams(searchParams, [
                      { key: "jobListingId", value: String(jobListing.id) },
                      { key: "step", value: "2" },
                    ])}
                    className="text-sky-600 hover:text-sky-700"
                  >
                    Questions
                    <span className="sr-only">, {jobListing.title}</span>
                  </Link>
                </td>
                <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                  <Link
                    href={getUpdatedSearchParams(searchParams, [
                      { key: "jobListingId", value: String(jobListing.id) },
                      { key: "step", value: "3" },
                    ])}
                    className="text-sky-600 hover:text-sky-700"
                  >
                    Interviews <span className="sr-only">, {jobListing.title}</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
