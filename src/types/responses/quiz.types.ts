import { question } from '../components/question.types';

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
  id: number;
  prompt: string;
  answers?: ISessionAnswer[];
  type: question;
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
  id: number;
  value: string;
}