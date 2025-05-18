import { Injectable } from '@angular/core';
import { GradeService } from '../grade.service';
import { ISessionAnswer } from '../../../../types/responses/quiz.types';

@Injectable({
  providedIn: 'root'
})
export class MultipleChoiceGraderService extends GradeService<string, string[]> {
  /**
   * @param correctAnswers the correct answers. ``null`` means that
   * the question has not been graded yet
   * @returns an array of the correct answers' IDs or ``null`` if ``correctAnswers``
   * is ``null``.
   */
  override formatCorrectAnswers(correctAnswers: ISessionAnswer[] | null): string[] | null {
    if (correctAnswers === null) {
      return null;
    }

    return correctAnswers.map(ca => ca.id);
  }

  /**
   * Returns ``null`` if the question has not been graded or a boolean value that
   * indicates whether the question has been answered correctly.
   * 
   * The question is considered correct if the user has checked all correct answers
   * and has not checked any wrong answers (order does not matter). This method uses
   * a superset algorithm to compare the user's answer to the correct answers.
   * This algorithm asymptotically takes O(n) time on average.
   * 
   * **Note:** this method has an early exit for if the correct answers' amount
   * is different from the user's answers'. If the correct answers looks like
   * ``[1, 2, 3]`` and the user answers look like ``[1, 2, 3, 3]``, this will still
   * return ``false``.
   * @param answers the user's answers
   * @param correctAnswers the correct answers or ``null`` if the question has not
   * been graded yet.
   * @returns a boolean value that indicates whether the question is correct or wrong
   * or ``null`` if the question has not been graded yet.
   */
  override grade(answers: string[], correctAnswers: ISessionAnswer[] | null): boolean | null {
    const formattedCorrectAnswers = this.formatCorrectAnswers(correctAnswers);
    if (formattedCorrectAnswers === null) {
      return null;
    }

    if (answers.length !== formattedCorrectAnswers.length) {
      return false;
    }

    const superSet = new Map<string, number>();
    for (const answer of formattedCorrectAnswers) {
      superSet.set(answer, 1);
    }

    for (const answer of answers) {
      if (!answer) {
        throw new Error('Empty string discovered');
      }

      if (!superSet.get(answer)) {
        return false;
      }

      superSet.set(answer, 2);
    }

    for (const [_key, value] of superSet) {
      if (value === 1) {
        return false;
      }
    }

    return true;
  }

  /**
   * @param answer the ID of the specific answer
   * @param correctAnswers the correct answers. ``null`` means that the question
   * has not been graded yet.
   * @returns A class name that indicates the answer's status. This can be used
   * to style the answer control.
   */
  override generateGradedAnswerClass(answer: string, correctAnswers: ISessionAnswer[] | null): 'correct-answer' | 'wrong-answer' | 'not-graded' {
    const formattedCorrectAnswers = this.formatCorrectAnswers(correctAnswers);
    if (formattedCorrectAnswers === null) {
      return 'not-graded';
    }

    return formattedCorrectAnswers.includes(answer) ? 'correct-answer' : 'wrong-answer';
  }

}
