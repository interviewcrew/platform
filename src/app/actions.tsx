'use server';

import { z } from 'zod';
import { SUBMISSION_RESULT_RESPONSE, createSubmission, getSubmissionResult, isWaiting } from './judge0';
import { supportedLangIds } from "./supportedIDEConfigs";

export interface CodeSubmission {
  id?: string,
  code: string,
  languageId: number,
  response?: string
}

const schema = z.object({
  code: z.string(),
  languageId: z.enum(supportedLangIds),
})

export async function createCodeSubmission(
  _prevState: SUBMISSION_RESULT_RESPONSE,
  formData: FormData
): Promise<SUBMISSION_RESULT_RESPONSE> {
  // const request = schema.parse({
  //   code: formData.get('code'),
  //   languageId: formData.get('languageId'),
  // })

  // const result = await getCodeResult(request);

  // return result
  return new Promise((resolve, reject) => {
    return resolve({
      stdout: "This was the standard output",
      time: "It took 1.2 seconds",
      memory: "It used 1.2 MB of memory",
      stderr: "This was the standard error",
      token: "1234",
      compile_output: "This was the compile output",
      message: "This was the message",
      status: { id: 3, description: "Accepted" },
    })
  });
}

async function getCodeResult(request: { code: string; languageId: string; }) {
  return createSubmission({ code: request.code, languageId: parseInt(request.languageId) })
    .then(({ token }) => pollSubmissionResult(token));
}

async function pollSubmissionResult(token: string): Promise<SUBMISSION_RESULT_RESPONSE> {
  const result = await getSubmissionResult(token);

  if (isWaiting(result)) {
    await new Promise(resolve => setTimeout(resolve, 1000));

    return pollSubmissionResult(token)
  }

  return deserialize(result)
}

function deserialize(result: SUBMISSION_RESULT_RESPONSE): SUBMISSION_RESULT_RESPONSE {
  if (result.stdout != null) result.stdout = atob(result.stdout)
  if (result.stderr != null) result.stderr = atob(result.stderr)
  if (result.compile_output != null) result.compile_output = atob(result.compile_output)
  if (result.message != null) result.message = atob(result.message)

  return result
}
