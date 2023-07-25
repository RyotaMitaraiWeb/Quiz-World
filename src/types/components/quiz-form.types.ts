import { IQuestionSubmission } from './question.types';

/**
 * ```typescript
  interface IQuizFormSubmission {
    title: string;
    description: string;
    instantMode: boolean;
    questions: Partial<{
      prompt: string | null;
      correctAnswers: Partial<{
        answer: string | null;
      }>[];
      wrongAnswers: Partial<{
        answer: string | null;
      }>[];
      type: string | null;
    }>[];
  }
 * ```
 */
export interface IQuizFormSubmission {
  title: string;
  description: string;
  instantMode: boolean;
  questions: Partial<{
    prompt: string | null;
    correctAnswers: Partial<{
      answer: string | null;
    }>[];
    wrongAnswers: Partial<{
      answer: string | null;
    }>[];
    type: string | null;
  }>[];
}

export interface IEditQuizFormSubmission {
  id: number;
  title: string;
  description: string;
  questions: IQuestionSubmission[];
}