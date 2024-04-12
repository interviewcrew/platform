import { getQuestionsForJobListing } from "@/app/job-listing-actions";
import {
  JobListingListItem,
  addQuestionsToJobListing,
} from "@/db/repositories/jobListingRepository";
import { Question } from "@/db/schema";
import { cn } from "@/lib/utils";
import { MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import {
  SparkleIcon,
  SparklesIcon,
  StarIcon,
  Wand2Icon,
  WandIcon,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { set } from "zod";

type GeneratedQuestion = {
  question: string;
  index: number;
  added: boolean;
};

export default function JobListingQuestions({
  jobListing,
  userId,
}: {
  userId: number;
  jobListing: JobListingListItem;
}) {
  const [questions, setQuestions] = useState<Question[]>(
    jobListing.questions ?? []
  );
  const [generatedQuestions, setGeneratedQuestions] = useState<
    GeneratedQuestion[]
  >([]);
  const [shouldGenerateQuestions, setShouldGenerateQuestions] = useState(false);

  const updateSelectedQuestions = (checkedIndex: number) => {
    setGeneratedQuestions(
      generatedQuestions.map((question, index) =>
        checkedIndex === question.index
          ? { ...question, added: !question.added }
          : question
      )
    );
  };

  const generateQuestions = async () => {
    const questions = await getQuestionsForJobListing(jobListing);

    const generatedQuestionsFromOpenAI = questions.map((question, index) => ({
      question,
      index,
      added: false,
    }));

    setGeneratedQuestions(generatedQuestionsFromOpenAI);
    setShouldGenerateQuestions(false);
  };

  return (
    <>
      <div className="mt-6">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Manage questions
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          You can see all the questions that were added so far for the interview
          based on the job listing. You could also use the{" "}
          <span className="font-bold">Generate Questions</span> button. Although
          there is no limitation to the number of questions, it is recommended
          to keep the number of questions to less than 15 overal!
        </p>
      </div>
      <fieldset className="mt-4">
        {questions.length > 0 && (
          <legend className="text-base font-semibold leading-6 text-gray-900">
            Job Listing Questions{" "}
            <span className="text-sm text-gray-500">({questions.length})</span>
          </legend>
        )}
        {questions.length > 0 && (
          <div className="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200 ">
            {questions.map((question, index) => (
              <div
                key={index + 1}
                className="relative flex items-start p-4 odd:bg-gray-100"
              >
                <div className="min-w-0 flex-1 text-sm leading-6">
                  <label
                    htmlFor={`generatedQuestion-${index + 1}`}
                    className="select-none font-medium text-gray-900"
                  >
                    {question.question}
                  </label>
                </div>
                <div className="ml-3 flex h-6 items-center">
                  <button>
                    <TrashIcon className="h-5 w-5 text-red-400 font-bold" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="my-8 flex justify-center">
          <button
            type="submit"
            className={cn(
              "flex rounded-md bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
              {
                "cursor-not-allowed": shouldGenerateQuestions,
              }
            )}
            onClick={() => {
              setShouldGenerateQuestions(true);
              generateQuestions();
            }}
            disabled={shouldGenerateQuestions}
          >
            {shouldGenerateQuestions ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </>
            ) : (
              <SparklesIcon className="h-5 w-5 mr-2" />
            )}
            Generate questions
          </button>
        </div>
        {generatedQuestions.length > 0 && (
          <div className="mt-8">
            <legend className="text-base font-semibold leading-6 text-gray-900">
              Questions to ask in the interview
            </legend>
            <div className="text-sm text-gray-500">
              Check the checkbox to add the question and use save and continue
              to save the changes
            </div>
          </div>
        )}
        <div className="mt-8 divide-y divide-gray-200 border-b border-t border-gray-200">
          {generatedQuestions
            .filter((question) => question.added)
            .map((question, index) => (
              <div
                key={index + 1}
                className="relative flex items-start p-4 odd:bg-gray-100"
              >
                <div className="min-w-0 flex-1 text-sm leading-6">
                  <label
                    htmlFor={`generatedQuestion-${index + 1}`}
                    className="select-none font-medium text-gray-900"
                  >
                    {question.question}
                  </label>
                </div>
                <div className="ml-3 flex h-6 items-center">
                  <button
                    onClick={() => {
                      updateSelectedQuestions(question.index);
                    }}
                  >
                    <XMarkIcon className="h-5 w-5 text-red-400 font-bold" />
                  </button>
                </div>
              </div>
            ))}
        </div>
        {generatedQuestions.length > 0 && (
          <div className="mt-8">
            <legend className="text-base font-semibold leading-6 text-gray-900">
              Generated questions not added
            </legend>
            <div className="text-sm text-gray-500">
              Check the checkbox to add the question and use save and continue
              to save the changes
            </div>
          </div>
        )}
        <div className="mt-8 divide-y divide-gray-200 border-b border-t border-gray-200">
          {generatedQuestions
            .filter((question) => !question.added)
            .map((question, index) => (
              <div
                key={index + 1}
                className="relative flex items-start p-4 odd:bg-gray-100"
              >
                <div className="min-w-0 flex-1 text-sm leading-6">
                  <label
                    htmlFor={`generatedQuestion-${index + 1}`}
                    className="select-none font-medium text-gray-900"
                  >
                    {question.question}
                  </label>
                </div>
                <div className="ml-3 flex h-6 items-center">
                  <button
                    onClick={() => {
                      updateSelectedQuestions(question.index);
                    }}
                  >
                    <PlusIcon className="h-5 w-5 text-sky-600 focus:ring-sky-600 font-bold" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </fieldset>
    </>
  );
}
