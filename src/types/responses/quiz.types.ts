import { question, shortQuestionType } from '../components/question.types';

/**
 * ```typescript
 * interface ICreatedQuizResponse {
    id: number;
  }
 * ```
 */
export interface ICreatedQuizResponse {
  id: number;
}

/**
 * ```typescript
 * interface IQuizDetails {
    id: number;
    title: string;
    description: string;
    instantMode: boolean;
    questions: ISessionQuestion[];
  }
 * ```
 */
export interface IQuizDetails {
  id: number;
  title: string;
  description: string;
  instantMode: boolean;
  questions: ISessionQuestion[];
  creatorId: string;
  creatorUsername: string;
  version: number;
}

/**
 * ```typescript
 * interface ISessionQuestion {
    id: number;
    prompt: string;
    answers?: ISessionAnswer[];
    type: question;
  }
 * ```
 */
export interface ISessionQuestion {
  id: string;
  prompt: string;
  answers?: ISessionAnswer[];
  type: shortQuestionType;
  notes: string | null;
}

/**
 * ```typescript
 * interface ISessionAnswer {
    id: number;
    value: string;
  }
 * ```
 */
export interface ISessionAnswer {
  id: string;
  value: string;
}

export interface IGradedAnswer {
  id: string;
  answers: ISessionAnswer[];
}