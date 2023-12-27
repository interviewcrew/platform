import Editor from '@/components/Editor';
import Layout from '../new-layout';
import { SupportedLanguage } from '../supportedLangs';
import Compiler from '@/components/Compiler';

export default function AssignmentPage() {
  const baseCode = `fun main() {
  println(test("foo"))
}

fun test(a: String): String = a`;
  const language: SupportedLanguage = { id: 78, language: "kotlin", engine: "Kotlin (1.3.70)" }

  return (
    <Layout>
      <Editor language={language} baseCode={baseCode}/>
      <Compiler />
    </Layout>
  )
}