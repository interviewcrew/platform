'use server';

import { z } from 'zod';
import { supportedLangIds } from "./supportedLangs";

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

export async function createCodeSubmission(prevState: any, formData: FormData): Promise<CodeSubmission> {
  const request = schema.parse({
    code: formData.get('code'),
    languageId: formData.get('languageId'),
  })

  return { code: request.code, languageId: parseInt(request.languageId), response: "response" }
}
