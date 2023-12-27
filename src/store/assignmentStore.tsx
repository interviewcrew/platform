import { SupportedLanguage } from '@/app/supportedLangs';
import { create } from 'zustand';
import {SUBMISSION_RESULT_RESPONSE} from '@/app/judge0';

interface AssignmentState {
  code: string;
  setCode: (code: string) => void;

  language: SupportedLanguage
  setLanguage: (language: SupportedLanguage) => void;

  submissionResult: SUBMISSION_RESULT_RESPONSE | null;
}

export const useAssignmentStore = create<AssignmentState>((set) => ({
    code: '',
    setCode: (code: string) => set({ code }),
    language: { id: 78, language: "kotlin", engine: "Kotlin (1.3.70)" },
    setLanguage: (language: SupportedLanguage) => {console.log(language); return set({ language })},
    submissionResult: null,
    setSubmissionResult: (submissionResult: SUBMISSION_RESULT_RESPONSE) => set({ submissionResult }),
}));