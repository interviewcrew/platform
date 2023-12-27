import Editor from '@/components/Editor';
import Layout from '../../../new-layout';
import { SupportedLanguage } from '../../../supportedIDEConfigs';
import Compiler from '@/components/Compiler';
import { AssignmentLayout } from '@/components/AssignmentLayout';

export default function AssignmentPage({params}: {params: {company: string, id: string}}) {
  const baseCode = `fun main() {
  println(test("foo"))
}

fun test(a: String): String = a`;
  const language: SupportedLanguage = { id: 78, language: "kotlin", engine: "Kotlin (1.3.70)" }

  return (
    <AssignmentLayout editor={
      <Editor language={language} baseCode={baseCode}/>
    } compiler={<Compiler />} problem={<></>}>
    </AssignmentLayout>
  )
}