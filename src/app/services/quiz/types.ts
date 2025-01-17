import { question, shortQuestionType } from '../../common/questionTypes';

export interface CreatedQuizResponse {
  id: number;
}

export interface QuizDetails {
  id: number;
  title: string;
  description: string;
  instantMode: boolean;
  questions: SessionQuestion[];
  creatorId: string;
  creatorUsername: string;
  version: number;
  createdOn: string;
  updatedOn: string;
}
export interface SessionQuestion {
  id: string;
  prompt: string;
  answers?: SessionAnswer[];
  type: shortQuestionType;
  notes: string | null;
}

export interface SessionAnswer {
  id: string;
  value: string;
}

export interface GradedAnswer {
  id: string;
  answers: SessionAnswer[];
}

export interface QuizFormSubmission {
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

export interface EditQuizForm {
  id: number;
  title: string;
  description: string;
  questions: QuestionSubmission[];
}

export interface Question {
  prompt: string;
  notes: string;
  answers: Answer[];
}

export type QuestionSubmission = {
  order: number;
  type: question;
} & Question

export interface Answer {
  value: string;
  correct: boolean;
}

export interface QuizListItem {
  id: number;
  title: string;
  description: string;
  instantMode: boolean;
  createdOn: string;
  updatedOn?: string;
}

export interface QuizList {
  quizzes: QuizListItem[];
  total: number;
}
