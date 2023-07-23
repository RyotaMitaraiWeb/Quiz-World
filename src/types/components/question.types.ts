import { ISessionAnswer } from '../responses/quiz.types';
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
    type: question;
  }
 * ```
 */
export interface IQuestionSubmission extends IQuestion {
  order: number;
  type: question;
}

/**
 * * **SingleChoice:** question presents multiple answers, of which only one is correct
 * * **MulitpleChoice:** question presents multiple answers, of which AT LEAST one (and possibly more)
 *  is correct
 * * **Text:** question presents a text field and the user must input an answer. These questions
 * can have multiple correct answers
 */
export type question = 'SingleChoice' | 'MultipleChoice' | 'Text';

export interface IQuestionComponent<T> {
  correctAnswers: ISessionAnswer[] | null;
  get isCorrect(): boolean | null;
}

