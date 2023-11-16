'use client'

import { LanguageName, langs, loadLanguage } from '@uiw/codemirror-extensions-langs';
import CodeMirror from '@uiw/react-codemirror';
import { useTheme } from 'next-themes';
import { useCallback, useState } from 'react';

const getDefaultLanguage = () => langs.javascript()

export default function Editor({
    sampleCode,
    langName,
  }: {
    sampleCode?: string
    langName?: LanguageName
  }
) {
    let { resolvedTheme } = useTheme()
    let theme: 'light' | 'dark' = resolvedTheme === 'dark' ? 'dark' : 'light'
  
    const [codeContent, setCodeContent] = useState(sampleCode ?? "");
    const onChange = useCallback((val: any, viewUpdate: any) => {
        setCodeContent(val);
    }, []);

    const lang = langName ? loadLanguage(langName)!! : getDefaultLanguage()

    return <CodeMirror theme={theme} value={codeContent} height="200px" extensions={[lang]} onChange={onChange} />;  
}
