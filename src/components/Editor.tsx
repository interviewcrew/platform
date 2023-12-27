'use client'

import { SupportedLanguage } from '@/app/supportedIDEConfigs';
import { loadLanguage } from '@uiw/codemirror-extensions-langs';
import CodeMirror, { Extension } from '@uiw/react-codemirror';
import { vscodeDark, defaultSettingsVscodeDark } from '@uiw/codemirror-theme-vscode';
import { githubLightInit, defaultSettingsGithubLight } from '@uiw/codemirror-theme-github';
import { useTheme } from 'next-themes';
import { useAssignmentStore } from '@/store/assignmentStore';
import { useEffect } from 'react';

export default function Editor({
  baseCode,
}: {
  baseCode: string
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

  const [setCode, selectedLanguage] = [
    useAssignmentStore((state) => state.setCode),
    useAssignmentStore((state) => state.language),
  ];

  useEffect(() => {
    setCode(baseCode);
  }, [baseCode, setCode]);

  const code = useAssignmentStore((state) => state.code);

  return (
    <div data-gramm="false" className='h-full rounded-b-lg'>
      <CodeMirror
        theme={theme}
        value={code}
        height='90%'
        extensions={[loadLanguage(selectedLanguage.language)!!]}
        onChange={setCode}
        className='h-full rounded-b-lg'
      />
    </div>
  );
}
