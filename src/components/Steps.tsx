"use client";

import { getUpdatedSearchParams } from "@/lib/utils";
import Link from "next/link";

export type Step = {
  id: string;
  name: string;
  onClick: () => void;
  status: "complete" | "current" | "upcoming";
};

export default function Steps({
  steps,
  searchParams,
  onClickCallBack,
}: {
  steps: Step[];
  searchParams: { [key: string]: string | string[] | undefined };
  onClickCallBack: (step: number) => void;
}) {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
        {steps.map((step, index) => (
          <li key={step.name} className="md:flex-1">
            {step.status === "complete" ? (
              <Link
                href={getUpdatedSearchParams(searchParams, [
                  { key: "step", value: String(index + 1) },
                ])}
                onClick={() => onClickCallBack(index + 1)}
                className="group flex flex-col border-l-4 border-sky-600 py-2 pl-4 hover:border-sky-800 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
              >
                <span className="text-sm font-medium text-sky-600 group-hover:text-sky-800">
                  {step.id}
                </span>
                <span className="text-sm font-medium">{step.name}</span>
              </Link>
            ) : step.status === "current" ? (
              <Link
                href={getUpdatedSearchParams(searchParams, [
                  { key: "step", value: String(index + 1) },
                ])}
                className="flex flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                aria-current="step"
              >
                <span className="text-sm font-medium text-sky-600">
                  {step.id}
                </span>
                <span className="text-sm font-medium">{step.name}</span>
              </Link>
            ) : (
              <Link
                href={getUpdatedSearchParams(searchParams, [
                  { key: "step", value: String(index + 1) },
                ])}
                className="group flex flex-col border-l-4 border-gray-200 py-2 pl-4 hover:border-gray-300 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                onClick={() => onClickCallBack(index + 1)}
              >
                <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                  {step.id}
                </span>
                <span className="text-sm font-medium">{step.name}</span>
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
