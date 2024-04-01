import { getAllInterviews } from "@/db/repositories/interviewRepository";
import {
  cn,
  getUpdatedSearchParams,
  humanizeDuration,
  toHumanTime,
} from "@/lib/utils";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const statuses = {
  upcoming: "text-gray-500 bg-gray-600/10 ring-gray-600/20",
  finished: "text-yellow-600 bg-yellow-600/10 ring-yellow-900/20",
  done: "text-indigo-400 bg-indigo-400/10 ring-indigo-400/30",
};

function getInterviewType(
  interview: Awaited<ReturnType<typeof getAllInterviews>>[0]
) {
  return interview.transcriptions.length > 0 ? "done" : "upcoming";
}

export function getInterviewDuration(
  interview: Awaited<ReturnType<typeof getAllInterviews>>[0]
): string {
  if (interview.transcriptions.length === 0) return "0s";
  const start = interview.transcriptions[0].createdAt;
  const end =
    interview.transcriptions[interview.transcriptions.length - 1].createdAt;

  return humanizeDuration(start, end);
}

export default async function InterviewDetails({
  interviews,
  searchParams,
}: {
  interviews: Awaited<ReturnType<typeof getAllInterviews>>;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let interviewId = -1;
  if (searchParams.interviewId && typeof searchParams.interviewId === "string") {
    interviewId = Number(searchParams.interviewId);
  }

  return (
    <ul role="list" className="divide-y divide-white/5">
      {interviews.map((interview) => (
        <li
          key={interview.id}
          className={cn("relative flex items-center space-x-4 px-5 py-4 ", {
            "bg-gray-400/10": interview.id === interviewId,
          })}
        >
          <div className="min-w-0 flex-auto">
            <div className="flex items-center gap-x-3">
              <h2 className="min-w-0 text-sm font-semibold leading-6">
                <Link
                  href={getUpdatedSearchParams(
                    searchParams,
                    "interviewId",
                    interview.id + ""
                  )}
                  className="flex gap-x-2"
                >
                  <span className="truncate">{interview.title}</span>
                  <span className="text-xs text-gray-400">
                    gmeet / {interview.hash}
                  </span>
                </Link>
              </h2>
            </div>
            <div className="flex items-center gap-x-2.5 text-xs leading-5 text-gray-400">
              {getInterviewType(interview) !== "upcoming" && (
                <p className="truncate">
                  duration: {getInterviewDuration(interview)}
                </p>
              )}
              <svg
                viewBox="0 0 2 2"
                className="h-0.5 w-0.5 flex-none fill-gray-300"
              >
                <circle cx={1} cy={1} r={1} />
              </svg>
              <p className="whitespace-nowrap">
                {toHumanTime(interview.createdAt)}
              </p>
            </div>
          </div>
          <div
            className={cn(
              statuses[getInterviewType(interview)],
              "rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset"
            )}
          >
            {interview.transcriptions.length > 0 ? "Done" : "Upcoming"}
          </div>
          <ChevronRightIcon
            className="h-5 w-5 flex-none text-gray-600"
            aria-hidden="true"
          />
        </li>
      ))}
    </ul>
  );
}
