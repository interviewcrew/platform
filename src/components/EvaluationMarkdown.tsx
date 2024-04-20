"use client";

import MarkdownPreview from "@uiw/react-markdown-preview";
import { ComponentStyle, colors } from "./EvaluationSection";


export function EvaluationMarkdown({
  value,
  type,
}: {
  value: string;
  type: string;
}) {
  const style: ComponentStyle = colors[type].style ?? {};
  return (
    <>
      <MarkdownPreview style={style} source={value} />
    </>
  );
}
