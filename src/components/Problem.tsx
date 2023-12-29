'use client'

import React, { useEffect } from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { useTheme } from 'next-themes';
import { useState } from 'react';


export default function Problem({ problem }: { problem: string }) {
  let { resolvedTheme } = useTheme()

  const [style, setStyle] = useState<React.CSSProperties>({
    maxHeight: "100%",
    maxWidth: "100%",
    padding: "1rem",
  });

  const [colorMode, setColorMode] = useState<"light" | "dark">('dark');

  // useEffect(() => {
  //   if (resolvedTheme === 'light') {
  //     setStyle({
  //       ...style,
  //       backgroundColor: 'rgb(248 250 252)',
  //     });
      
  //     setColorMode("light");
  //   }
  //   else {
  //     setStyle({
  //       ...style,
  //       backgroundColor: '#1e1e1e',
  //     });

  //     setColorMode("dark");
  //   }
  // }, [resolvedTheme, style]);

  return (
    <MarkdownPreview
      style={{...style, colorScheme: resolvedTheme}}
      wrapperElement={{
        "data-color-mode": colorMode,
      }}
      source={problem} />
  )
}