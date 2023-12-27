'use client'

import { SupportedLanguage, supportedLangs } from '@/app/supportedIDEConfigs';
import { loadLanguage } from '@uiw/codemirror-extensions-langs';
import CodeMirror from '@uiw/react-codemirror';
import { useTheme } from 'next-themes';
import MenuWithSecondary from './MenuWithSecondary';
import { useAssignmentStore } from '@/store/assignmentStore';

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
      <CodeMirror
        theme={theme}
        value={codeContent}
        height='100%'
        extensions={[loadLanguage(selectedLang.language)!!]}
        onChange={setCodeContent}
        className='h-full rounded-b-lg'
      />
    </>
  );
}
