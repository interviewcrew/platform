'use client'

import { CodeSubmission, createCodeSubmission } from '@/app/actions';
import { SupportedLanguage, supportedLangs } from '@/app/supportedLangs';
import { loadLanguage } from '@uiw/codemirror-extensions-langs';
import CodeMirror from '@uiw/react-codemirror';
import { useTheme } from 'next-themes';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Button } from './Button';
import MenuWithSecondary from './MenuWithSecondary';

const initialState: CodeSubmission = {
  code: "",
  languageId: 1
}

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

  const onChange = useCallback((val: any, viewUpdate: any) => {
    setCodeContent(val);
  }, []);

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
        onChange={onChange}
        className='mb-3'
      />
      <form action={formAction}>
        <input type="hidden" id="code" name="code" value={codeContent} required />
        <input type="hidden" id="languageId" name="languageId" value={selecetedLang.id} required />
        <SubmitButton />
        <p aria-live="polite" className="sr-only">
          {codeSubmission?.response}
        </p>
      </form>
    </>
  );
}
