import Editor from '@/components/Editor';
import Layout from '@/app/new-layout';
import { SupportedLanguage } from '@/app/supportedIDEConfigs';
import Compiler from '@/components/Compiler';

export default function AssignmentPage({params}: {params: {company: string, id: string}}) {
  const baseCode = `fun main() {
  println(test("foo"))
}

fun test(a: String): String = a`;
  const language: SupportedLanguage = { id: 78, language: "kotlin", engine: "Kotlin (1.3.70)" }

  return (
    <>
      {params.id + ' ' + params.company}
      <Editor language={language} baseCode={baseCode}/>
      <Compiler />
    </>
  )
}