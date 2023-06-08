/**
 * ```typescript
  interface IQuizFormSubmission {
    title: string;
    description: string;
    instantMode: boolean;
    questions: Partial<{
      title: string | null;
      description: string | null;
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
      instantMode: boolean | null;
    }>;
  }
 * ```
 */
export interface IQuizFormSubmission {
  title: string;
  description: string;
  instantMode: boolean;
  questions: Partial<{
    title: string | null;
    description: string | null;
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
    instantMode: boolean | null;
  }>;
}