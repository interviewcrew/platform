import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { CheckIcon, EditIcon, Trash2Icon, Undo2Icon } from "lucide-react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { Question } from "@/db/schema";

export function EditableQuestions({
  questions: savedQuestions,
  deleteQuestionCallback,
  updateQuestionCallback,
  addQuestionCallback,
}: {
  questions: Question[];
  deleteQuestionCallback: (question: Question) => void;
  updateQuestionCallback: (question: Question) => void;
  addQuestionCallback: (question: Question) => void;
}) {
  const [questions, setQuestions] = useState<Question[]>(savedQuestions);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  const saveEditing = (question: Question) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === question.id) {
          return question;
        }

        return q;
      })
    );

    setEditingQuestion(null);
    updateQuestionCallback(question);
  };

  const deleteQuestion = (question: Question) => {
    deleteQuestionCallback(question);
  };

  const isBeingEdited = (question: Question) => {
    return editingQuestion && editingQuestion.id === question.id;
  };

  useEffect(() => {
    setQuestions(savedQuestions);
  }, [savedQuestions]);

  return (
    <>
      <div className="mt-4 divide-y divide-gray-200">
        {questions.map((q, index) => (
          <div
            key={index + 1}
            className={cn("relative flex items-start p-4 odd:bg-gray-100", {
              "odd:bg-white border-2": isBeingEdited(q),
            })}
          >
            <div className="min-w-0 flex-1 text-sm leading-6 ">
              {!isBeingEdited(q) ? (
                <label
                  htmlFor={`generatedQuestion-${index + 1}`}
                  className={cn("select-none font-medium text-gray-900")}
                >
                  {q.question}
                </label>
              ) : (
                <textarea
                  className="-m-4 p-4  w-full border-0 text-gray-900 shadow-sm ring-0 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm"
                  value={editingQuestion?.question}
                  onChange={(e) => {
                    if (!editingQuestion) return;

                    setEditingQuestion({
                      ...editingQuestion,
                      question: e.target.value,
                    });
                  }}
                />
              )}
            </div>
            <div className="ml-3 flex h-6 items-center">
              {isBeingEdited(q) ? (
                <>
                  <button onClick={() => setEditingQuestion(null)}>
                    <XMarkIcon className="h-5 w-5 text-sky-600 font-bold" />
                  </button>
                  <button
                    onClick={() => {
                      if (editingQuestion) {
                        saveEditing(editingQuestion);
                      }
                    }}
                  >
                    <CheckIcon className="h-5 w-5 text-sky-600 font-bold" />
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => setEditingQuestion(q)}>
                    <EditIcon className="h-5 w-5 text-sky-600 font-bold" />
                  </button>
                  <button onClick={() => deleteQuestion(q)}>
                    <Trash2Icon className="h-5 w-5 text-sky-600 font-bold" />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
        {questions.length === 0 && (
          <div className="p-4 text-sm text-gray-500 border-dashed rounded-lg border-2">
            There are no already saved questions
          </div>
        )}
      </div>
    </>
  );
}
