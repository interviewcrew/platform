'use client'

import { createCodeSubmission } from '@/app/actions';
import { initialState } from '@/app/judge0';
import { SupportedLanguage, supportedLangs } from '@/app/supportedLangs';
import { loadLanguage } from '@uiw/codemirror-extensions-langs';
import CodeMirror from '@uiw/react-codemirror';
import { useTheme } from 'next-themes';
import { Dispatch, SetStateAction, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Button } from './Button';
import { Pre } from './Code';
import MenuWithSecondary from './MenuWithSecondary';

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" aria-disabled={pending}>Submit</Button>
  )
}

function LanguageSelector({
  selectedLanguage,
  setSelectedLanguage
}: {
  selectedLanguage: SupportedLanguage,
  setSelectedLanguage: Dispatch<SetStateAction<SupportedLanguage>>
}) {
  return (
    <MenuWithSecondary
      label='Engine:'
      items={[...supportedLangs]}
      selectedItem={selectedLanguage}
      setSelectedItem={setSelectedLanguage}
      keySelector={l => l.id}
      primarySelector={l => l.language}
      secondarySelector={l => l.engine}
    />
  )
}

export default function Editor({
  baseCode,
  language,
}: {
  baseCode: string
  language: SupportedLanguage
}
) {
  let { resolvedTheme } = useTheme()
  let theme: 'light' | 'dark' = resolvedTheme === 'dark' ? 'dark' : 'light'

  const [codeContent, setCodeContent] = useState(baseCode);
  const [selecetedLang, setSelecetedLang] = useState(language);

  const [codeSubmission, formAction] = useFormState(createCodeSubmission, initialState);

  return (
    <>
      <div className='mb-3'>
        <LanguageSelector
          selectedLanguage={selecetedLang}
          setSelectedLanguage={setSelecetedLang}
        />
      </div>
      <CodeMirror
        theme={theme}
        value={codeContent}
        height="200px"
        extensions={[loadLanguage(selecetedLang.language)!!]}
        onChange={setCodeContent}
        className='mb-3'
      />
      <form action={formAction}>
        <input type="hidden" id="code" name="code" value={codeContent} required />
        <input type="hidden" id="languageId" name="languageId" value={selecetedLang.id} required />
        <SubmitButton />
      </form>
      {codeSubmission.stdout && <Pre title='Standard Output' code={codeSubmission.stdout}><>{codeSubmission.stdout}</></Pre>}
      {codeSubmission.stderr && <Pre title='Standard Error' code={codeSubmission.stderr}><>{codeSubmission.stderr}</></Pre>}
      {codeSubmission.compile_output && <Pre title='Compile Output' code={codeSubmission.compile_output}><>{codeSubmission.compile_output}</></Pre>}
      {codeSubmission.message && <Pre title='Message' code={codeSubmission.message}><>{codeSubmission.message}</></Pre>}
    </>
  );
}
