import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { CheckIcon, EditIcon, Trash2Icon, Undo2Icon } from "lucide-react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { Interview } from "@/db/schema";
import Link from "next/link";

export function EditableInterviews({
  interviews: savedInterviews,
  deleteInterviewCallback,
  updateInterviewCallback,
  clickedOnInterviewCallback,
}: {
  interviews: Interview[];
  deleteInterviewCallback: (interview: Interview) => void;
  updateInterviewCallback: (interview: Interview) => void;
  clickedOnInterviewCallback: (interview: Interview) => void;
}) {
  const [interviews, setInterviews] = useState<Interview[]>(savedInterviews);
  const [editingInterview, setEditingInterview] = useState<Interview | null>(
    null
  );

  const saveEditing = (interview: Interview) => {
    setInterviews(
      interviews.map((it) => {
        if (it.id === interview.id) {
          return interview;
        }

        return it;
      })
    );

    setEditingInterview(null);
    updateInterviewCallback(interview);
  };

  const isBeingEdited = (interview: Interview) => {
    return editingInterview && editingInterview.id === interview.id;
  };

  useEffect(() => {
    setInterviews(savedInterviews);
  }, [savedInterviews]);

  return (
    <>
      <div className="mt-4 divide-y divide-gray-200">
        {interviews.map((inter, index) => (
          <div
            key={index + 1}
            className={cn("relative flex items-start p-4", {
              "odd:bg-white border-2": isBeingEdited(inter),
            })}
          >
            <div className="min-w-0 flex-1 text-sm leading-6 ">
              {!isBeingEdited(inter) ? (
                <div>
                  <Link
                    href={`/dashboard/interviews/${inter.hash}`}
                    key={inter.id}
                    className={cn(
                      "relative flex items-start [&:not(:last-child)]:border-b-2 hover:bg-gray-100"
                    )}
                  >
                    <div>{inter.title}</div>
                  </Link>
                </div>
              ) : (
                <textarea
                  className="-m-4 p-4  w-full border-0 text-gray-900 shadow-sm ring-0 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm"
                  value={editingInterview?.title}
                  onChange={(e) => {
                    if (!editingInterview) return;

                    setEditingInterview({
                      ...editingInterview,
                      title: e.target.value,
                    });
                  }}
                />
              )}
            </div>
            <div className="ml-3 flex h-6 items-center">
              {isBeingEdited(inter) ? (
                <>
                  <button onClick={() => setEditingInterview(null)}>
                    <XMarkIcon className="h-5 w-5 text-sky-600 font-bold" />
                  </button>
                  <button
                    onClick={() => {
                      if (editingInterview) {
                        saveEditing(editingInterview);
                      }
                    }}
                  >
                    <CheckIcon className="h-5 w-5 text-sky-600 font-bold" />
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => setEditingInterview(inter)}>
                    <EditIcon className="h-5 w-5 text-sky-600 font-bold" />
                  </button>
                  <button onClick={() => deleteInterviewCallback(inter)}>
                    <Trash2Icon className="h-5 w-5 text-sky-600 font-bold" />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
        {interviews.length === 0 && (
          <div className="p-4 text-sm text-gray-500 border-dashed rounded-lg border-2">
            There are no already saved interviews
          </div>
        )}
      </div>
    </>
  );
}
