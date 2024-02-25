'use client'

import { initialState } from '@/app/judge0';
import { useTheme } from 'next-themes';
import { useFormState, useFormStatus } from 'react-dom';
import { useInterviewStore } from '@/store/interviewStore';
import { createCodeSubmission } from '@/app/actions';
import { useEffect } from 'react';
import { useContainerSize } from '@/lib/hooks/ContinerSize';

function SubmitButton({backgroundColor, hoverColor, textColor}: {backgroundColor: string, hoverColor: string, textColor: string}) {
  const { pending } = useFormStatus()

  const [setIsCompiling] = [
    useInterviewStore((state) => state.setIsCompiling),
  ];

  useEffect(() => {
    setIsCompiling(pending)
  }, [setIsCompiling, pending])

  const loadingSpinner = (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  )

  const cursorStatus = pending ? "cursor-not-allowed" : "cursor-pointer";

  return (
    <button type="submit" className={`inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md transition ease-in-out duration-150 ${cursorStatus} ${textColor} ${backgroundColor} ${hoverColor}`} disabled={false}>
      {pending && loadingSpinner}
      {pending && "Running..." || "Run Code"}
    </button>
  )
}

export function CompileButton() {
  const { resolvedTheme } = useTheme();

  const [codeContent, selectedLang, setSubmissionResult] = [
    useInterviewStore((state) => state.code),
    useInterviewStore((state) => state.language),
    useInterviewStore((state) => state.setSubmissionResult),
  ];


  const [submissionResults, formAction] = useFormState(createCodeSubmission, initialState);

  useEffect(() => {
    setSubmissionResult(submissionResults);
  }, [submissionResults, setSubmissionResult])


  const backgroundColor = resolvedTheme === 'dark' ? 'bg-emmaPrimaryDark' : 'bg-emmaPrimary';
  const hoverColor = resolvedTheme === 'dark' ? 'hover:bg-emmaPrimaryDarkHover' : 'hover:bg-emmaPrimaryHover';

  return (
    <form action={formAction}>
      <input type="hidden" id="code" name="code" value={codeContent} required />
      <input type="hidden" id="languageId" name="languageId" value={selectedLang.id} required />
      <SubmitButton textColor='text-white' backgroundColor={backgroundColor} hoverColor={hoverColor} />
    </form>
  )
}

function formatMemoryUsage(bytes: number): string {
  const kilobytes = bytes / 1024;
  const megabytes = kilobytes / 1024;

  if (megabytes >= 1) {
      return `${megabytes.toFixed(2)} MB`;
  } else {
      return `${kilobytes.toFixed(2)} KB`;
  }
}

function formatTimeUsage(seconds: number): string {
  if(seconds >= 60) {
      const minutes = seconds / 60;
      return `${Math.floor(minutes)} min ${Math.floor(seconds % 60)} s`;
  }
  else if (seconds >= 1) {
      return `${Math.floor(seconds)} s ${Math.floor(seconds % 1 * 1000)} ms`;
  } else {
      return `${seconds * 1000} ms`;
  }
}

function Error({title, error}: {title: string, error: string}) {
  return (
    <>
      <h2 className="text-2xl font-medium dark:text-red-500/[.8] text-red-500">{title}</h2>
      <div className='mt-4 rounded-md dark:bg-red-800/[.12] bg-red-100 p-4'>
          <div className='dark:text-red-400/[.8] text-red-600'>
            <p>{error}</p>
          </div>
      </div>
    </>
  )
}


function SuccessfulCompile({title, output, time, memory}: {title: string, output: string, time: string, memory: string | null}) {
  const { resolvedTheme } = useTheme();
  const [containerRef, size] = useContainerSize();

  const isWidthLarge = size.width > 640;

  return (
    <>
      <div ref={containerRef} className={`${isWidthLarge ? 'flex items-end space-x-6' : ''}`}>
        <h2 className="text-2xl font-normal text-green-500">{title}</h2>
        <p className={`text-stone-400 ${isWidthLarge ? 'mt-4' : ''}`}>Runtime: {formatTimeUsage(Number(time))}</p>
        <p className={`text-stone-400`}>Memory: {formatMemoryUsage(Number(memory)/1000)}</p>
      </div>
      <h6 className='mt-8 text-sm text-stone-400 font-bold'>Output</h6>
      <div className='mt-4 rounded-md dark:bg-neutral-800 bg-slate-100 p-4 dark:text-stone-300 text-black font-normal'>
        <p>{output}</p>
      </div>
    </>
  )
}

function CompileSuspence() {
  return (
    <div role="status" className="max-w-sm animate-pulse mt-8 p-4">
      <div className="h-6 bg-gray-200 rounded-full dark:bg-neutral-700 w-48"></div>
      <div className="h-3 bg-gray-200 rounded-full dark:bg-neutral-700 w-24 mt-8"></div>
      <div className="h-4 bg-gray-200 rounded-full dark:bg-neutral-700 w-[300px] mt-3"></div>
      <div className="h-4 bg-gray-200 rounded-full dark:bg-neutral-700 w-[420px] mt-2"></div>
      <div className="h-4 bg-gray-200 rounded-full dark:bg-neutral-700 w-[280px] mt-2"></div>
      <div className="h-4 bg-gray-200 rounded-full dark:bg-neutral-700 w-[210px] mt-2"></div>
      <div className="h-4 bg-gray-200 rounded-full dark:bg-neutral-700 w-[360px] mt-2"></div>
    </div>
  )
}

export function CompilerResults() {
  const [codeSubmission, isCompiling] = [
    useInterviewStore((state) => state.submissionResult)!!,
    useInterviewStore((state) => state.isCompiling),
  ];

  return (
    <>
      {isCompiling && <CompileSuspence />}
      {!isCompiling && (<div className='p-4'>
        { codeSubmission.stdout && <SuccessfulCompile title='Finished' time={codeSubmission.time!!} memory={codeSubmission.memory} output={codeSubmission.stdout}/>}
        { codeSubmission.stderr && <Error title='Runtime Error' error={codeSubmission.stderr}/> }
        { codeSubmission.compile_output && <Error title="Compile Error" error={codeSubmission.compile_output} />}
      </div>)}
    </>
  );
}
