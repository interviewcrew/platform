import Editor from '@/components/Editor';
import Layout from '../new-layout';

export default function EditorPage() {
  return (
    <Layout>
      <Editor langName='kotlin' sampleCode='fun test(a: String): String'></Editor>
    </Layout>
  )
}