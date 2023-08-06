import { Injectable } from '@angular/core';
import { GradeService } from '../grade.service';
import { ISessionAnswer } from '../../../../types/responses/quiz.types';

@Injectable({
  providedIn: 'root'
})
export class SingleChoiceGraderService extends GradeService<string, string> {
  override formatCorrectAnswers(correctAnswers: ISessionAnswer[] | null): string[] | null {
    if (correctAnswers === null) {
      return null;
    }

    return correctAnswers.map(ca => ca.id);
  }

  override grade(answers: string, correctAnswers: ISessionAnswer[] | null): boolean | null {
    const formattedCorrectAnswers = this.formatCorrectAnswers(correctAnswers);
    if (formattedCorrectAnswers === null) {
      return null;
    }

    const correctAnswer = formattedCorrectAnswers[0];
    return answers === correctAnswer;
  }

  override generateGradedAnswerClass(answer: string, correctAnswers: ISessionAnswer[] | null): 'correct-answer' | 'wrong-answer' | 'not-graded' {
    const isCorrect = this.grade(answer, correctAnswers);

    if (isCorrect === null) {
      return 'not-graded';
    }

    return isCorrect ? 'correct-answer' : 'wrong-answer';
  }

}
