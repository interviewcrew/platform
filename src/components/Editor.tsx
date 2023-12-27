'use client'

import { SupportedLanguage, supportedLangs } from '@/app/supportedLangs';
import { loadLanguage } from '@uiw/codemirror-extensions-langs';
import CodeMirror from '@uiw/react-codemirror';
import { useTheme } from 'next-themes';
import MenuWithSecondary from './MenuWithSecondary';
import { useAssignmentStore } from '@/store/assignmentStore';

function LanguageSelector() {
  const selectedLanguage = useAssignmentStore((state) => state.language); 
  const setSelectedLanguage = useAssignmentStore((state) => state.setLanguage);

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
}: {
  baseCode: string
  language: SupportedLanguage
}
) {
  let { resolvedTheme } = useTheme()
  let theme: 'light' | 'dark' = resolvedTheme === 'dark' ? 'dark' : 'light'


  const [codeContent, setCodeContent, selectedLang] = [
    useAssignmentStore((state) => state.code),
    useAssignmentStore((state) => state.setCode),
    useAssignmentStore((state) => state.language),
  ];

  setCodeContent(baseCode);

  return (
    <>
      <div className='mb-3'>
        <LanguageSelector/>
      </div>
      <CodeMirror
        theme={theme}
        value={codeContent}
        height="200px"
        extensions={[loadLanguage(selectedLang.language)!!]}
        onChange={setCodeContent}
        className='mb-3'
      />
    </>
  );
}
