'use client'

import { SupportedLanguage } from '@/app/supportedIDEConfigs';
import { loadLanguage } from '@uiw/codemirror-extensions-langs';
import CodeMirror, { Extension } from '@uiw/react-codemirror';
import { vscodeDark, defaultSettingsVscodeDark } from '@uiw/codemirror-theme-vscode';
import { githubLightInit, defaultSettingsGithubLight } from '@uiw/codemirror-theme-github';
import { useTheme } from 'next-themes';
import { useAssignmentStore } from '@/store/assignmentStore';

export default function Editor({
  baseCode,
}: {
  baseCode: string
  language: SupportedLanguage
}
) {
  let { resolvedTheme } = useTheme()

  const githubLight = githubLightInit({
    settings: {
      background: 'rgb(248 250 252)',
      fontFamily: defaultSettingsVscodeDark.fontFamily,
      gutterBorder: 'rgb(248 250 252)',
      gutterBackground: 'rgb(248 250 252)',
      gutterForeground: defaultSettingsGithubLight.gutterForeground
    }
  })

  let theme: Extension = resolvedTheme === 'dark' ? vscodeDark : githubLight;

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
        height='99%'
        extensions={[loadLanguage(selectedLang.language)!!]}
        onChange={setCodeContent}
        className='h-full rounded-b-lg'
      />
    </>
  );
}
