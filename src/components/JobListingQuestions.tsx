import {
  QuestionWithChange,
  generateQuestionsForJobListing,
  saveQuestionsForJobListing,
} from "@/app/job-listing-actions";
import {
  JobListingListItem,
  addQuestionsToJobListing,
} from "@/db/repositories/jobListingRepository";
import { Question } from "@/db/schema";
import { cn } from "@/lib/utils";
import { PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";
import {
  SparklesIcon,
} from "lucide-react";
import { useState } from "react";
import { EditableQuestions } from "@/components/EditableQuestions";

function GeneratedQuestions({
  questions,
  addQuestion,
}: {
  questions: Question[];
  addQuestion: (index: number) => void;
}) {
  return (
    <div className="mt-8 divide-y divide-gray-200 border-b border-t border-gray-200">
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
            <button onClick={() => addQuestion(index)}>
              <PlusIcon className="h-5 w-5 text-sky-600 focus:ring-sky-600 font-bold" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function JobListingQuestions({
  jobListing,
  userId,
  doneCallback,
  cancelCallback,
}: {
  userId: number;
  jobListing: JobListingListItem;
  doneCallback: (jobListing: JobListingListItem) => void;
  cancelCallback: () => void;
}) {
  const [questions, setQuestions] = useState<QuestionWithChange[]>(
    jobListing.questions.map((question, index) => ({
      ...question,
      status: index == 0 ? "unchanged" : index == 1 ? "deleted" : "updated",
    }))
    // []
  );

  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
  const [isSavingQuestions, setIsSavingQuestions] = useState(false);

  const saveQuestions = async (questions: Question[]) => {
    setIsSavingQuestions(true);
    await addQuestionsToJobListing(jobListing, userId, questions);
    setIsSavingQuestions(false);
  };

  const deleteQuestion = async (index: number) => {
    setQuestions(
      questions.map((question: QuestionWithChange, i) => {
        if (
          (question.status === "unchanged" || question.status === "updated") &&
          index === i
        ) {
          return {
            ...question,
            status: "deleted",
          };
        }

        return question;
      })
    );
  };

  const editQuestion = async (
    editedQuestions: QuestionWithChange[],
    index: number
  ) => {
    setQuestions(
      editedQuestions.map((question: QuestionWithChange, i) => {
        if (
          (question.status === "unchanged" ||
            question.status === "deleted" ||
            question.status == "updated") &&
          index === i
        ) {
          return {
            ...question,
            status: "updated",
          };
        }

        return question;
      })
    );
  };

  const undoQuestionStatus = async (index: number) => {
    const undoQuestion = jobListing.questions.find(
      (question) => question.id === questions[index].id
    );

    if (!undoQuestion) {
      return;
    }

    setQuestions(
      questions.map((question: QuestionWithChange) => {
        if (
          question.id === undoQuestion.id &&
          (question.status === "deleted" || question.status === "updated")
        ) {
          return {
            ...question,
            question: undoQuestion.question,
            status: "unchanged",
          };
        }

        return question;
      })
    );
  };

  const updateSelectedQuestions = (
    questions: QuestionWithChange[],
    checkedIndex: number
  ) => {
    setQuestions(
      questions.map((question, index) =>
        checkedIndex === index
          ? {
              ...question,
              status: question.status === "selected" ? "generated" : "selected",
            }
          : question
      )
    );
  };

  const generateQuestions = async () => {
    setIsGeneratingQuestions(true);

    const generatedQuestions = await generateQuestionsForJobListing(jobListing);

    setQuestions([
      ...questions.filter((question) => question.status !== "generated"),
      ...generatedQuestions.map(
        (generatedQuestion: string): QuestionWithChange => ({
          question: generatedQuestion,
          isGenerated: true,
          jobListingId: jobListing.id,
          interviewId: null,
          userId: userId,
          status: "generated",
        })
      ),
    ]);

    setIsGeneratingQuestions(false);
  };

  const getQuestions = (
    statuses: ("generated" | "selected" | "deleted" | "updated" | "unchanged")[]
  ) => {
    return questions.filter((question) => statuses.includes(question.status));
  };

  const handleSave = async (questions: QuestionWithChange[]) => {
    setIsSavingQuestions(true);
    const updatedJobListing = {
      ...jobListing,
      questions: await saveQuestionsForJobListing(questions),
    };

    setIsSavingQuestions(false);
    doneCallback(updatedJobListing);
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
          to keep the number of questions to less than{" "}
          <span className="font-bold">15</span> overal!
        </p>
      </div>
      <div className="mt-4 grid lg:grid-cols-2 sm:grid-cols">
        <div className="pr-2 border-r border-solid">
          <div className="">
            <div>
              <legend className="text-base font-semibold leading-6 text-gray-900">
                Questions during the interview
                <span className="text-sm text-gray-500">
                  {" (" +
                    getQuestions([
                      "selected",
                      "deleted",
                      "unchanged",
                      "updated",
                    ]).length +
                    ")"}
                </span>
              </legend>
              <div className="text-sm text-gray-500">
                The questions mentioned here are the ones that would be shown
                during the interview. By saving and continuing, you can save the
                changes
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
                  "rounded-md bg-gradient-to-r from-sky-600 to-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
                  {
                    "cursor-not-allowed": isSavingQuestions,
                  }
                )}
                onClick={async () => await handleSave(questions)}
                disabled={isSavingQuestions}
              >
                Save and Continue
              </button>
            </div>
          </div>
          <div className="mt-4">
            <EditableQuestions
              questions={questions}
              deleteQuestionCallback={deleteQuestion}
              editQuestionCallback={editQuestion}
              undoQuestionCallback={undoQuestionStatus}
            />
          </div>
        </div>
        <div className="pl-2">
          <div>
            <legend className="text-base font-semibold leading-6 text-gray-900">
              Generated questions not added
              <span className="text-sm text-gray-500">
                {" (" + getQuestions(["generated"]).length + ")"}
              </span>
            </legend>
            <div className="text-sm text-gray-500">
              The questions in this column are not going to be saved. Add the
              ones you want by clicking on the plus sign
            </div>
          </div>
          <div className="flex justify-center mt-2">
            <button
              type="submit"
              className={cn(
                "min-w-48 max-h-10 flex rounded-md bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
                {
                  "cursor-not-allowed": isGeneratingQuestions,
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
                </>
              ) : (
                <SparklesIcon className="h-5 w-5 mr-2" />
              )}
              Generate questions
            </button>
          </div>
          {getQuestions(["generated"]).length > 0 && (
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
            {getQuestions(["selected"]).map((question, index) => (
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
                      updateSelectedQuestions(questions, index);
                    }}
                  >
                    <XMarkIcon className="h-5 w-5 text-red-400 font-bold" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {getQuestions(["generated"]).length > 0 && (
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
            {getQuestions(["generated"]).map((question, index) => (
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
                      updateSelectedQuestions(questions, index);
                    }}
                  >
                    <PlusIcon className="h-5 w-5 text-sky-600 focus:ring-sky-600 font-bold" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
