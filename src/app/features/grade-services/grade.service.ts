import { Injectable } from '@angular/core';
import { ISessionAnswer } from '../../../types/responses/quiz.types';

/**
 * An abstract class that provides the required methods for any specific
 * implementation of a grade service. ``TAnswer`` represents the type of the
 * answer. ``TAnswerSubmission`` represents the type of the submitted answers
 * (for example, multiple choice questions are submitted with an array of
 * strings, while text questions are submitted with a singular string).
 */
@Injectable({
  providedIn: 'root',
})
export abstract class GradeService<TAnswer, TAnswerSubmission> {
  /**
   * Returns an array of ``TAnswer`` values or ``null`` if the question has not been graded yet.
   * @param correctAnswers the correct answers or ``null`` 
   * if the question is not graded yet
   */
  abstract formatCorrectAnswers(correctAnswers: ISessionAnswer[] | null): TAnswer[] | null;

  /**
   * @param answers the user's answers
   * @param correctAnswers the correct answers or ``null`` if the question has
   * not been graded yet.
   * @returns a boolean value that indicates whether the user has answered
   * correctly or ``null`` if ``correctAnswers`` is ``null``.
   */
  abstract grade(answers: TAnswerSubmission, correctAnswers: ISessionAnswer[] | null): boolean | null;

  generatePromptClass(isCorrect: boolean | null): "unanswered" | "correct" | "wrong" {
    if (isCorrect === null) {
      return 'unanswered';
    }

    return isCorrect ? 'correct' : 'wrong';
  }

  /**
   * @param answer The answer of the control
   * @param correctAnswers The correct answers or ``null`` if the question
   * has not been graded yet.
   * @returns A class name that can be used to apply styling to the answer
   * based on whether it's correct, wrong, or yet to be graded.
   */
  abstract generateGradedAnswerClass(answer: TAnswer, correctAnswers: ISessionAnswer[] | null): "correct-answer" | "wrong-answer" | "not-graded";
}
