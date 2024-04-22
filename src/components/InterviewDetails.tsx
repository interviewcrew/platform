import { getAllInterviews } from "@/db/repositories/interviewRepository";
import { CheckCircleIcon, PaperClipIcon } from "@heroicons/react/20/solid";
import {
  cn,
  getUpdatedSearchParams,
  humanizeDuration,
  toHumanTime,
} from "@/lib/utils";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import EmptyInterviewDetails from "./EmptyInterviewDetails";

function getInterviewType(
  interview: Awaited<ReturnType<typeof getAllInterviews>>[0]
) {
  return interview.transcriptions.length > 0 ? "done" : "upcoming";
}

function getInterviewDuration(
  interview: Awaited<ReturnType<typeof getAllInterviews>>[0]
): string {
  if (interview.transcriptions.length === 0) return "0s";
  const start = interview.transcriptions[0].createdAt;
  const end =
    interview.transcriptions[interview.transcriptions.length - 1].createdAt;

  return humanizeDuration(start, end);
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="border-t border-gray-100 bg-gray-100 -mx-5 py-6 sm:col-span-12 sm:px-0">
      <h3 className="text-xl text-gray-600 font-semibold px-5">{title}</h3>
    </div>
  );
}

export default async function InterviewDetails({
  interview,
  searchParams,
}: {
  interview: Awaited<ReturnType<typeof getAllInterviews>>[0] | null;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  if (!interview) {
    return <EmptyInterviewDetails />;
  }

  const interviewLink = `https://meet.google.com/${interview.hash}`;

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg p-5">
      <div className="px-4 sm:px-0">
        <h3 className="text-2xl font-bold leading-7 text-gray-600">
          {interview.title}
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          {toHumanTime(interview.createdAt)} - Duration:{" "}
          {getInterviewDuration(interview)}
        </p>
      </div>
      <div className="mt-6">
        <dl className="grid grid-cols-1 sm:grid-cols-12">
          <SectionHeader title="Interview details" />
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-6 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Interview link
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              <Link href={interviewLink}>{interviewLink}</Link>
            </dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-3 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Problem
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {interview.problem?.title ?? "Not specified"}
            </dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-3 sm:px-0">
            <Link
              href={getUpdatedSearchParams(searchParams, [
                { key: "evaluation", value: "true" },
              ])}
              className="flex gap-x-2"
            >
              <button
                type="button"
                className="inline-flex items-center gap-x-2 rounded-md bg-gradient-to-r from-blue-600 to-cyan-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go to Evaluation
              </button>
            </Link>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-3 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Status
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {getInterviewType(interview)}
            </dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-3 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Duration
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {getInterviewDuration(interview)}
            </dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-3 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Submissions
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {interview.submissions.length}
            </dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-3 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Interview Language
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {interview.language?.name ?? "Not specified"}
            </dd>
          </div>
          <SectionHeader title="Candidate details" />
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-6 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Full name
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {interview.candidate?.name ?? "Not specified"}
            </dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-6 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Email address
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {interview.candidate?.email ?? "Not specified"}
            </dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-12 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              About
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {interview.candidate?.about ?? "Not specified"}
            </dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-12 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Resume
            </dt>
            <dd className="mt-2 text-sm text-gray-900">
              {interview.candidate?.resume ? (
                <ul
                  role="list"
                  className="divide-y divide-gray-100 rounded-md border border-gray-200"
                >
                  <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                    <div className="flex w-0 flex-1 items-center">
                      <PaperClipIcon
                        className="h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <div className="ml-4 flex min-w-0 flex-1 gap-2">
                        <span className="truncate font-medium">
                          {interview.candidate?.resume?.split("/").pop()}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <a
                        href="#"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Download
                      </a>
                    </div>
                  </li>
                </ul>
              ) : (
                <div className="text-gray-400">Not uploaded</div>
              )}
            </dd>
          </div>
          <SectionHeader title="Job Ad" />
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Title
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {interview.jobListing?.title ?? "Not specified"}
            </dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Position
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {interview.jobListing?.position ?? "Not specified"}
            </dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Seniority
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {interview.jobListing?.seniority ?? "Any"}
            </dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-12 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Description
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {interview.jobListing?.description ?? "Not specified"}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
