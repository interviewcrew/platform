import { getAllInterviews } from "@/db/repositories/interviewRepository";
import { PaperClipIcon } from "@heroicons/react/20/solid";
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
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          {interview.title}
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            {getInterviewDuration(interview)}
        </p>
      </div>
      <div className="mt-6">
        <dl className="grid grid-cols-1 sm:grid-cols-2">
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
                Interview link
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                <Link href={interviewLink}>{interviewLink}</Link>
            </dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Position 
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              Backend Developer
            </dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Email address
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              margotfoster@example.com
            </dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Salary expectation
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              $120,000
            </dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              About
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
              incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
              consequat sint. Sit id mollit nulla mollit nostrud in ea officia
              proident. Irure nostrud pariatur mollit ad adipisicing
              reprehenderit deserunt qui eu.
            </dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Attachments
            </dt>
            <dd className="mt-2 text-sm text-gray-900">
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
                        resume_back_end_developer.pdf
                      </span>
                      <span className="flex-shrink-0 text-gray-400">2.4mb</span>
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
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <PaperClipIcon
                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">
                        coverletter_back_end_developer.pdf
                      </span>
                      <span className="flex-shrink-0 text-gray-400">4.5mb</span>
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
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
