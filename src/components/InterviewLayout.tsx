'use client'

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { useInterviewStore } from '@/store/interviewStore';
import { useEffect, useState } from "react";

export function InterviewLayout({
  editor,
  compiler,
  problem,
}: {
  editor: React.ReactNode,
  compiler: React.ReactNode,
  problem: React.ReactNode,
}) {

  const [submissionResult, isCompiling] = [
    useInterviewStore((state) => state.submissionResult),
    useInterviewStore((state) => state.isCompiling),
  ];

  const [hasResults, setHasResults] = useState(submissionResult !== null && submissionResult.status.id !== 1);

  useEffect(() => {
    setHasResults(isCompiling || submissionResult?.status.id !== 1);
  }, [submissionResult, isCompiling]);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="relative flex h-full flex-col px-2"
    >
      <ResizablePanel defaultSize={50} className="min-w-[300px] p-2 flex flex-col">
        <div className="dark:bg-neutral-800 bg-slate-100 rounded-t-lg p-2">Problem</div>
        <div className="flex h-full items-center justify-center rounded-b-lg dark:bg-editor bg-slate-50 overflow-y-scroll">
          {problem}
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50} className="min-w-[300px]">
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={hasResults ? 60 : 100} className="min-h-[200px] h-full w-full p-2 flex flex-col">
            <div className="dark:bg-neutral-800 bg-slate-100 rounded-t-lg p-2">Code</div>
            <div className="h-full w-full rounded-b-lg dark:bg-editor bg-slate-50 overflow-y-scroll">
              {editor}
            </div>
          </ResizablePanel>
          {hasResults && <>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={hasResults ? 40 : 0} className="p-2 min-h-[100px] flex flex-col">
              <div className="dark:bg-neutral-800 bg-slate-100 rounded-t-lg p-2">Results</div>
              <div className="h-full w-full rounded-b-lg dark:bg-editor bg-slate-50">
                {compiler}
              </div>
            </ResizablePanel>
          </>
          }
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
