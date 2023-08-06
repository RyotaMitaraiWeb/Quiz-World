import { Injectable } from '@angular/core';
import { GradeService } from '../grade.service';
import { ISessionAnswer } from '../../../../types/responses/quiz.types';

@Injectable({
  providedIn: 'root'
})
export class TextGraderService extends GradeService<string, string> {
  override generateGradedAnswerClass(answer: string, correctAnswers: ISessionAnswer[] | null): 'correct-answer' | 'wrong-answer' | 'not-graded' {
    const isCorrect = this.grade(answer, correctAnswers);
    if (isCorrect === null) {
      return 'not-graded';
    }

    return isCorrect ? 'correct-answer' : 'wrong-answer';
  }
  override formatCorrectAnswers(correctAnswers: ISessionAnswer[] | null): string[] | null {
    if (correctAnswers === null) {
      return null;
    }

    return correctAnswers.map(ca => ca.value);
  }

  override grade(answers: string, correctAnswers: ISessionAnswer[] | null): boolean | null {
    const formattedCorrectAnswers = this.formatCorrectAnswers(correctAnswers);
    if (formattedCorrectAnswers === null) {
      return null;
    }

    const normalizedAnswers = formattedCorrectAnswers.map(this.normalizeAnswer);
    return normalizedAnswers.includes(this.normalizeAnswer(answers));
  }

  /**
   * Returns a normalized variant of ``answer``, which is trimmed (on both ends),
   * has all letters uppercased, and has all spaces removed.
   * @param answer 
   * @returns a trimmed and uppercased ``answer`` with all spaces removed.
   */
  private normalizeAnswer(answer: string) {
    return answer.trim().toUpperCase().replaceAll(' ', '');
  }
}
