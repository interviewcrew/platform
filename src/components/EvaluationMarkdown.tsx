"use client";

import MarkdownPreview from "@uiw/react-markdown-preview";
import { useState } from "react";

export function EvaluationWithMarkdown({ value, isDefaultOpen }: { value: string, isDefaultOpen?: boolean}) {
  const [isOpen, setIsOpen] = useState(isDefaultOpen);

  return (
    <>
      <div className="rounded-md p-4 border-grey-100 border-2 shadow-md">
        <div className="flex">
          <h3 className="px-3 text-2xl font-bold">
            More comprehensive assesment
          </h3>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md ml-auto text-sky-600 hover:bg-gray-100"
          >
            {isOpen ? "Hide" : "Show"}
          </button>
        </div>
        {isOpen && (
          <div className="pl-10 pr-6 mt-6 text-sm">
            <MarkdownPreview
              style={{
                backgroundColor: "transparent",
                color: "inherit",
              }}
              source={value}
            />
          </div>
        )}
      </div>
    </>
  );
}
