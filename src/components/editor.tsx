'use client'

import { useState, useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { loadLanguage, langNames, langs } from '@uiw/codemirror-extensions-langs';

export default function Editor() {
    const [value, setValue] = useState("console.log('hello world!');");
    const onChange = useCallback((val: any, viewUpdate: any) => {
        console.log('val:', val);
        setValue(val);
    }, []);

    const langName = 'kotlin'

    if (langName in langNames) {
        const lang = loadLanguage(langName)
        return <CodeMirror value={value} height="200px" extensions={[lang!!.extension]} onChange={onChange} />;  
    }

    return (<CodeMirror value={value} height="200px" extensions={[langs.java()]} onChange={onChange} />);  
}