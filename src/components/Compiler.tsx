'use client'

import { initialState } from '@/app/judge0';
import { useTheme } from 'next-themes';
import { useFormState, useFormStatus } from 'react-dom';
import { Pre } from './Code';
// import { useAssignmentStore } from '@/store/assignmentStore';
import { Button } from './Button';
import { createCodeSubmission } from '@/app/actions';
import { useEffect } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" aria-disabled={pending}>Execute</Button>
  )
}

export function CompileButton() {

  // const [codeContent, selectedLang, setSubmissionResult] = [
  //   useAssignmentStore((state) => state.code),
  //   useAssignmentStore((state) => state.language),
  //   useAssignmentStore((state) => state.setSubmissionResult),
  // ];

  const [submissionResults, formAction] = useFormState(createCodeSubmission, initialState);
  console.log("InitialState: ", submissionResults)

  // useEffect(() => {
  //   setSubmissionResult(submissionResults)
  //   console.log("Updated result: ", submissionResults);
  // }, [submissionResults, setSubmissionResult])

  return (
    <>
    <form action={formAction}>
      <input type="hidden" id="code" name="code" value="console.log('test')" required />
      <input type="hidden" id="languageId" name="languageId" value="63" required />
      <SubmitButton />
    </form>
    <>Foo</>
    <>{submissionResults.compile_output}</>
    <>{JSON.stringify(submissionResults)}</>
    </>
  )
}

export function CompilerResults() {
  // let { resolvedTheme } = useTheme()
  // let theme: 'light' | 'dark' = resolvedTheme === 'dark' ? 'dark' : 'light'


  // const codeSubmission = useAssignmentStore((state) => state.submissionResult)!!;

  return (
    <>
      {/* {codeSubmission.stdout && <Pre title='Standard Output' code={codeSubmission.stdout}><>{codeSubmission.stdout}</></Pre>}
      {codeSubmission.stderr && <Pre title='Standard Error' code={codeSubmission.stderr}><>{codeSubmission.stderr}</></Pre>}
      {codeSubmission.compile_output && <Pre title='Compile Output' code={codeSubmission.compile_output}><>{codeSubmission.compile_output}</></Pre>}
      {codeSubmission.message && <Pre title='Message' code={codeSubmission.message}><>{codeSubmission.message}</></Pre>} */}
    </>
  );
}
