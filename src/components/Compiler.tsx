'use client'

import { initialState } from '@/app/judge0';
import { useTheme } from 'next-themes';
import { useFormState, useFormStatus } from 'react-dom';
import { Pre } from './Code';
import { useAssignmentStore } from '@/store/assignmentStore';
import { Button } from './Button';
import { createCodeSubmission } from '@/app/actions';

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" aria-disabled={pending}>Execute</Button>
  )
}

export function CompileButton() {

  const [codeContent, selectedLang, submissionResult, setSubmissionResult] = [
    useAssignmentStore((state) => state.code), 
    useAssignmentStore((state) => state.language), 
    useAssignmentStore((state) => state.submissionResult),
    useAssignmentStore((state) => state.setSubmissionResult),
  ];

  const [codeSubmission, formAction] = useFormState(createCodeSubmission, initialState);

  return (
        <form action={formAction}>
          <input type="hidden" id="code" name="code" value={codeContent} required />
          <input type="hidden" id="languageId" name="languageId" value={selectedLang.id} required />
          <SubmitButton />
        </form>
  )
}

export default function Compiler() {
  let { resolvedTheme } = useTheme()
  let theme: 'light' | 'dark' = resolvedTheme === 'dark' ? 'dark' : 'light'


  const codeSubmission = useAssignmentStore((state) => state.submissionResult)!!;

  return (
    <>
      {codeSubmission.stdout && <Pre title='Standard Output' code={codeSubmission.stdout}><>{codeSubmission.stdout}</></Pre>}
      {codeSubmission.stderr && <Pre title='Standard Error' code={codeSubmission.stderr}><>{codeSubmission.stderr}</></Pre>}
      {codeSubmission.compile_output && <Pre title='Compile Output' code={codeSubmission.compile_output}><>{codeSubmission.compile_output}</></Pre>}
      {codeSubmission.message && <Pre title='Message' code={codeSubmission.message}><>{codeSubmission.message}</></Pre>}
    </>
  );
}
