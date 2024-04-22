import {
  addQuestionToJobListing,
  generateQuestionsForJobListing,
  updateQuestionInJobListing,
  deleteQuestionFromJobListing,
} from "@/app/job-listing-actions";
import { JobListingListItem } from "@/db/repositories/jobListingRepository";
import { Question, NewQuestion } from "@/db/schema";
import { cn } from "@/lib/utils";
import { PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { SparklesIcon } from "lucide-react";
import { useState } from "react";
import { EditableQuestions } from "@/components/EditableQuestions";

export default function JobListingQuestions({
  jobListing,
  userId,
  step,
  doneCallback,
  cancelCallback,
}: {
  userId: number;
  jobListing: JobListingListItem;
  step: number;
  doneCallback: (jobListing: JobListingListItem, step: number) => void;
  cancelCallback: () => void;
}) {
  const [questions, setQuestions] = useState<Question[]>(jobListing.questions);
  const [generatedQuestions, setGeneratedQuestions] = useState<NewQuestion[]>(
    []
  );
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
  const [isSavingQuestions, setIsSavingQuestions] = useState(false);
  const [newQuestion, setNewQuestion] = useState<string>("");

  const deleteQuestion = async (deletedQuestion: Question) => {
    setIsSavingQuestions(true);

    await deleteQuestionFromJobListing(deletedQuestion);

    setQuestions(
      questions.filter((question: Question) => {
        if (deletedQuestion.id === question.id) {
          return false;
        }

        return true;
      })
    );

    jobListing.questions = questions;

    setIsSavingQuestions(false);
  };

  const updateQuestion = async (updatedQuestion: Question) => {
    setIsSavingQuestions(true);

    await updateQuestionInJobListing(updatedQuestion);

    setQuestions(
      questions.map((question: Question) => {
        if (updatedQuestion.id === question.id) {
          return updatedQuestion;
        }

        return question;
      })
    );

    jobListing.questions = questions;

    setIsSavingQuestions(false);
  };

  const addQuestion = async (question: NewQuestion) => {
    setIsSavingQuestions(true);

    const addedQuestion = await addQuestionToJobListing(question);

    setQuestions([...questions, addedQuestion]);
    setGeneratedQuestions((generatedQuestions) =>
      generatedQuestions.filter(
        (generatedQuestion) => generatedQuestion.question !== question.question
      )
    );

    jobListing.questions = questions;

    setIsSavingQuestions(false);
  };

  const generateQuestions = async () => {
    setIsGeneratingQuestions(true);

    const generatedQuestions = await generateQuestionsForJobListing(jobListing);

    setGeneratedQuestions([
      ...generatedQuestions.map(
        (generatedQuestion: string): NewQuestion => ({
          question: generatedQuestion,
          isGenerated: true,
          jobListingId: jobListing.id,
          interviewId: null,
          userId: userId,
        })
      ),
    ]);

    setIsGeneratingQuestions(false);
  };

  return (
    <>
      <div className="mt-6">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Manage questions
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Here you can add questions to see during the interview. By presseing
          the <span className="font-bold">Generate Questions</span> button you
          can generate new questions based on the job listing and decide which
          one to add to display the interview.
        </p>
      </div>
      <div className="mt-4 grid lg:grid-cols-2 sm:grid-cols">
        <div className="pr-2 border-r border-solid">
          <div>
            <legend className="text-base font-semibold leading-6 text-gray-900">
              Generated questions
              <span className="text-sm text-gray-500">
                {" (" + generateQuestions.length + ")"}
              </span>
            </legend>
            <div className="text-sm text-gray-500">
              The questions in this column are generated, but will not be
              displayed during the interview until you add them by pressing the
              plus sign.
            </div>
          </div>
          <div className="flex justify-center mt-2">
            <button
              type="submit"
              className={cn(
                "min-w-48 max-h-10 flex rounded-md bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600",
                {
                  "cursor-not-allowed": isGeneratingQuestions,
                  "text-sky-700 bg-gradient-to-r from-blue-100 to-cyan-100 hover:bg-sky-700":
                    questions.length > 0,
                }
              )}
              onClick={() => {
                generateQuestions();
              }}
              disabled={isGeneratingQuestions}
            >
              {isGeneratingQuestions ? (
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
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {"Generating questions"}
                </>
              ) : (
                <>
                  <SparklesIcon className="h-5 w-5 mr-2" />
                  {"Generate questions"}
                </>
              )}
            </button>
          </div>
          <div className="mt-4 divide-y divide-gray-200">
            {generatedQuestions.length === 0 && (
              <div className="p-4 text-sm text-gray-500 border-dashed rounded-lg border-2">
                There are no generated questions to be added
              </div>
            )}
            {generatedQuestions.map((generatedQuestion, index) => (
              <div
                key={index + 1}
                className="relative flex items-start p-4 odd:bg-gray-100"
              >
                <div className="min-w-0 flex-1 text-sm leading-6">
                  <label
                    htmlFor={`generatedQuestion-${index + 1}`}
                    className="select-none font-medium text-gray-900"
                  >
                    {generatedQuestion.question}
                  </label>
                </div>
                <div className="ml-3 flex h-6 items-center">
                  <button
                    onClick={() => {
                      addQuestion(generatedQuestion);
                    }}
                  >
                    <PlusIcon className="h-5 w-5 text-sky-600 focus:ring-sky-600 font-bold" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="pl-2">
          <div className="">
            <div>
              <legend className="text-base font-semibold leading-6 text-gray-900">
                Questions during the interview
                <span className="text-sm text-gray-500">
                  {" (" + questions.length + ")"}
                </span>
              </legend>
              <div className="text-sm text-gray-500">
                The questions mentioned here are the ones that would be shown
                during the interview. If empty, you could generate and add those
                questions.{" "}
              </div>
            </div>
            <div className="mt-2 flex justify-end items-center gap-x-4">
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
                  "rounded-md border-2 text-gray-600 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600",
                  {
                    "cursor-not-allowed": isSavingQuestions,
                    "bg-sky-600 text-white hover:bg-sky-500":
                      questions.length > 0,
                  }
                )}
                onClick={() => doneCallback(jobListing, 2)}
                disabled={isSavingQuestions}
              >
                Continue
              </button>
            </div>
          </div>
          <form
            className="w-full flex mt-5 sm:items-center"
            onSubmit={async (e) => {
              e.preventDefault();
              await addQuestion({
                question: newQuestion,
                isGenerated: false,
                jobListingId: jobListing.id,
                interviewId: null,
                userId: userId,
              });
              setNewQuestion("");
            }}
          >
            <div className="w-full">
              <label htmlFor="hash" className="sr-only">
                Add your own question
              </label>
              <input
                type="hash"
                name="hash"
                id="hash"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                placeholder="Write your own question here"
                onChange={(e) => setNewQuestion(e.target.value)}
                value={newQuestion}
              />
            </div>
            <button
              type="submit"
              className="mt-3 inline-flex min-w-36 items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-sky-800 border-2 border-sky-300 shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 sm:ml-3 sm:mt-0 sm:w-auto"
            >
              Add question
            </button>
          </form>
          <div className="mt-4">
            <EditableQuestions
              questions={questions}
              deleteQuestionCallback={deleteQuestion}
              updateQuestionCallback={updateQuestion}
              addQuestionCallback={addQuestion}
            />
          </div>
        </div>
      </div>
    </>
  );
}
