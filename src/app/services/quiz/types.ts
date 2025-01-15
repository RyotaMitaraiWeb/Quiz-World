import { question, shortQuestionType } from "../../common/questionTypes";

export type CreatedQuizResponse = {
  id: number;
}

export type IQuizDetails = {
  id: number;
  title: string;
  description: string;
  instantMode: boolean;
  questions: SessionQuestion[];
  creatorId: string;
  creatorUsername: string;
  version: number;
}
export type SessionQuestion = {
  id: string;
  prompt: string;
  answers?: SessionAnswer[];
  type: shortQuestionType;
  notes: string | null;
}

export type SessionAnswer = {
  id: string;
  value: string;
}

export type GradedAnswer = {
  id: string;
  answers: SessionAnswer[];
}

export type QuizFormSubmission = {
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
    notes: string | null;
  }>[];
}

export type EditQuizForm = {
  id: number;
  title: string;
  description: string;
  questions: QuestionSubmission[];
}

export type Question = {
  prompt: string;
  notes: string;
  answers: Answer[];
}

/**
 * ```typescript
 * interface IQuestionSubmission {
    prompt: string;
    answers: IAnswer[];
    order: number;
    type: question;
  }
 * ```
 */
export type QuestionSubmission = {
  order: number;
  type: question;
} & Question

export type Answer = {
  value: string;
  correct: boolean;
}

export type QuizListItem = {
  id: number;
  title: string;
  description: string;
  instantMode: boolean;
  createdOn: string;
  updatedOn?: string;
}

export type QuizList = {
  quizzes: QuizListItem[];
  total: number;
}
