import { QuestionWithChange } from "@/app/job-listing-actions";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  CheckIcon,
  EditIcon,
  Trash2Icon,
  Undo2Icon,
} from "lucide-react";
import { XMarkIcon } from "@heroicons/react/20/solid";

export function EditableQuestions({
  questions,
  deleteQuestionCallback,
  editQuestionCallback,
  undoQuestionCallback,
}: {
  questions: QuestionWithChange[];
  deleteQuestionCallback: (index: number) => void;
  editQuestionCallback: (
    questions: QuestionWithChange[],
    index: number
  ) => void;
  undoQuestionCallback: (index: number) => void;
}) {
  type EditableQuestionsWithStatus = QuestionWithChange & {
    originalQuestion: string;
    isEditing: boolean;
  };

  const [questionsWithEditable, setQuestionsWithEditable] = useState<
    EditableQuestionsWithStatus[]
  >(
    questions.map((question) => ({
      ...question,
      isEditing: false,
      originalQuestion: question.question,
    }))
  );

  const isSaved = (question: QuestionWithChange) =>
    question.status == "unchanged" ||
    question.status == "updated" ||
    question.status == "deleted";

  const isDeleted = (question: QuestionWithChange) =>
    question.status == "deleted";

  const isChanged = (question: QuestionWithChange) =>
    question.status == "updated" || question.status == "deleted";

  const toggleToEditable = (
    editableQuestions: EditableQuestionsWithStatus[],
    index: number
  ) => {
    const editedQuestion = questions[index];

    const updatedQuestions = editableQuestions.map((question, i) => {
      if (index === i) {
        return {
          ...question,
          question: editedQuestion.question,
          isEditing: !question.isEditing,
        };
      }

      return question;
    });

    setQuestionsWithEditable(updatedQuestions);
  };

  const undoQuestion = (index: number) => {
    setQuestionsWithEditable(
      questionsWithEditable.map((question: EditableQuestionsWithStatus, i) => {
        if (
          i === index &&
          (question.status === "deleted" || question.status === "updated")
        ) {
          return {
            ...question,
            question: question.originalQuestion,
            status: "unchanged",
          };
        }

        return question;
      })
    );

    undoQuestionCallback(index);
  };

  const deleteQuestion = (index: number) => {
    const updatedQuestions = questionsWithEditable.map((question, i) => {
      if (
        (question.status === "unchanged" || question.status === "updated") &&
        index === i
      ) {
        question.status = "deleted";
      }

      return question;
    });

    setQuestionsWithEditable(updatedQuestions);
    deleteQuestionCallback(index);
  };

  const saveTextChange = (
    questions: EditableQuestionsWithStatus[],
    index: number
  ) => {
    const isStatusChanged =
      questions[index].question !== questions[index].originalQuestion;

    const updatedQuestions = questions.map((question, i) => {
      if (
        (question.status === "unchanged" ||
          question.status === "deleted" ||
          question.status == "updated") &&
        index === i
      ) {
        question.status = isStatusChanged ? "updated" : "unchanged";
        question.isEditing = false;
      }

      return question;
    });

    setQuestionsWithEditable(updatedQuestions);

    if (isStatusChanged) {
      editQuestionCallback(updatedQuestions, index);
    }
  };

  return (
    <>
      <legend className="text-base font-semibold leading-6 text-gray-900">
        Already saved questions
        <span className="text-sm text-gray-500">
          {" (" + questionsWithEditable.filter(isSaved).length + ")"}
        </span>
      </legend>
      <div className="mt-4 divide-y divide-gray-200">
        {questionsWithEditable.map(
          (question, index) =>
            isSaved(question) && (
              <div
                key={index + 1}
                className={cn("relative flex items-start p-4 odd:bg-gray-100", {
                  "odd:bg-white border-2": question.isEditing,
                })}
              >
                <div className="min-w-0 flex-1 text-sm leading-6 ">
                  {!question.isEditing ? (
                    <label
                      htmlFor={`generatedQuestion-${index + 1}`}
                      className={cn("select-none font-medium text-gray-900", {
                        "line-through text-gray-500": isDeleted(question),
                      })}
                    >
                      {question.question}
                    </label>
                  ) : (
                    <textarea
                      className="-m-4 p-4  w-full border-0 text-gray-900 shadow-sm ring-0 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm"
                      value={question.question}
                      onChange={(e) => {
                        const updatedQuestions = questionsWithEditable.map(
                          (q, i) => {
                            if (index === i) {
                              return {
                                ...q,
                                question: e.target.value,
                              };
                            }

                            return q;
                          }
                        );

                        setQuestionsWithEditable(updatedQuestions);
                      }}
                    />
                  )}
                </div>
                <div className="ml-3 flex h-6 items-center">
                  {isChanged(question) && !question.isEditing && (
                    <button onClick={() => undoQuestion(index)}>
                      <Undo2Icon className="h-5 w-5 text-sky-600 font-bold" />
                    </button>
                  )}
                  {!isDeleted(question) &&
                    (question.isEditing ? (
                      <button
                        onClick={() =>
                          toggleToEditable(questionsWithEditable, index)
                        }
                      >
                        <XMarkIcon className="h-5 w-5 text-sky-600 font-bold" />
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          toggleToEditable(questionsWithEditable, index)
                        }
                      >
                        <EditIcon className="h-5 w-5 text-sky-600 font-bold" />
                      </button>
                    ))}
                  {!isDeleted(question) &&
                    (question.isEditing ? (
                      <button
                        onClick={() =>
                          saveTextChange(questionsWithEditable, index)
                        }
                      >
                        <CheckIcon className="h-5 w-5 text-sky-600 font-bold" />
                      </button>
                    ) : (
                      <button onClick={() => deleteQuestion(index)}>
                        <Trash2Icon className="h-5 w-5 text-sky-600 font-bold" />
                      </button>
                    ))}
                </div>
              </div>
            )
        )}
        {questions.filter(isSaved).length === 0 && (
          <div className="p-4 text-sm text-gray-500 border-dashed rounded-lg border-2">
            No unchanged questions
          </div>
        )}
      </div>
    </>
  );
}