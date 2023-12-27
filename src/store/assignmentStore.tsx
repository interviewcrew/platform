import { SupportedKeyBinding, SupportedLanguage } from '@/app/supportedIDEConfigs';
import { create } from 'zustand';
import {SUBMISSION_RESULT_RESPONSE} from '@/app/judge0';

interface AssignmentState {
  code: string;
  setCode: (code: string) => void;

  language: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
  
  keyBinding: SupportedKeyBinding;
  setKeyBinding: (keyBinding: SupportedKeyBinding) => void;

  submissionResult: SUBMISSION_RESULT_RESPONSE | null;
  setSubmissionResult: (submissionResult: SUBMISSION_RESULT_RESPONSE) => void;

  isCompiling: boolean;
  setIsCompiling: (isCompiling: boolean) => void;
}

export const useAssignmentStore = create<AssignmentState>((set) => ({
    code: '',
    setCode: (code: string) => set({ code }),
    language:{ id: 74, language: "typescript", engine: "TypeScript (3.7.4)" },
    setLanguage: (language: SupportedLanguage) => set({ language }),
    keyBinding: {id: 1, name: "Standard", description: "Standard key bindings"},
    setKeyBinding: (keyBinding: SupportedKeyBinding) => set({ keyBinding }),
    submissionResult: null,
    setSubmissionResult: (submissionResult: SUBMISSION_RESULT_RESPONSE) => set({ submissionResult }),
    isCompiling: false,
    setIsCompiling: (isCompiling: boolean) => set({ isCompiling }),
}));
