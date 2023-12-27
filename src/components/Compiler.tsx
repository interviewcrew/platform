'use client'

import { createCodeSubmission } from '@/app/actions';
import { initialState } from '@/app/judge0';
import { useTheme } from 'next-themes';
import { useFormState, useFormStatus } from 'react-dom';
import { Button } from './Button';
import { Pre } from './Code';
import { useAssignmentStore } from '@/store/assignmentStore';

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" aria-disabled={pending}>Submit</Button>
  )
}

export default function Compiler() {
  let { resolvedTheme } = useTheme()
  let theme: 'light' | 'dark' = resolvedTheme === 'dark' ? 'dark' : 'light'


  const [codeContent, selectedLang] = [
    useAssignmentStore((state) => state.code), 
    useAssignmentStore((state) => state.language), 
  ];

  const [codeSubmission, formAction] = useFormState(createCodeSubmission, initialState);

  return (
    <>
      <form action={formAction}>
        <input type="hidden" id="code" name="code" value={codeContent} required />
        <input type="hidden" id="languageId" name="languageId" value={selectedLang.id} required />
        <SubmitButton />
      </form>
      {codeSubmission.stdout && <Pre title='Standard Output' code={codeSubmission.stdout}><>{codeSubmission.stdout}</></Pre>}
      {codeSubmission.stderr && <Pre title='Standard Error' code={codeSubmission.stderr}><>{codeSubmission.stderr}</></Pre>}
      {codeSubmission.compile_output && <Pre title='Compile Output' code={codeSubmission.compile_output}><>{codeSubmission.compile_output}</></Pre>}
      {codeSubmission.message && <Pre title='Message' code={codeSubmission.message}><>{codeSubmission.message}</></Pre>}
    </>
  );
}
