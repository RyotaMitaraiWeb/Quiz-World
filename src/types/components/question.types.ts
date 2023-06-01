import { IAnswer } from './answer.types';

/**
 * ```typescript
 * interface IQuestion {
    prompt: string;
    answers: IAnswer[];
  }
 * ```
 */
export interface IQuestion {
  prompt: string;
  answers: IAnswer[];
}

/**
 * ```typescript
 * interface IQuestionSubmission {
    prompt: string;
    answers: IAnswer[];
    order: number;
  }
 * ```
 */
export interface IQuestionSubmission extends IQuestion {
  order: number;
}