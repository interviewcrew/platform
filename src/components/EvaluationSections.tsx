"use client";

import MarkdownPreview from "@uiw/react-markdown-preview";

const colors: {
  [key: string]: {
    backgroundColor: string;
    color: string;
  };
} = {
  Highlights: {
    backgroundColor: "#f0fdf4",
    color: "#30754a",
  },
  Lowlights: {
    backgroundColor: "#fef2f2",
    color: "#9d2524",
  },
  Considerations: {
    backgroundColor: "#fefce8",
    color: "#895418",
  },
};

export default function EvaluationSections({
  value,
  type,
}: {
  value: string;
  type: string;
}) {
  const style: { [key: string]: string } = colors[type] ?? {};
  return (
    <>
      <MarkdownPreview style={style} source={value} />
    </>
  );
}
