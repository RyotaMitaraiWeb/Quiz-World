import { Injectable } from '@angular/core';
import { SessionAnswer } from '../quiz/types';
import { QuestionType } from './types';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  formatCorrectAnswers(correctAnswers: SessionAnswer[] | null, questionType: QuestionType): string[] | null {
    if (correctAnswers === null) {
      return null;
    }

    switch (questionType) {
      case QuestionType.Text:
        return correctAnswers.map(correctAnswer => correctAnswer.value);
      default:
        return correctAnswers.map(correctAnswer => correctAnswer.id);
    }
  }

  gradeSingleChoiceQuestion(answer: string, correctAnswers: SessionAnswer[] | null) {
    const formattedCorrectAnswers = this.formatCorrectAnswers(correctAnswers, QuestionType.SingleChoice);
    if (formattedCorrectAnswers === null) {
      return null;
    }

    const correctAnswer = formattedCorrectAnswers[0];
    return answer === correctAnswer;
  }

  gradeMultipleChoiceQuestion(answers: string[], correctAnswers: SessionAnswer[] | null) {
    const formattedCorrectAnswers = this.formatCorrectAnswers(correctAnswers, QuestionType.MultipleChoice);

    if (formattedCorrectAnswers === null) {
      return null;
    }

    return this._gradeMultipleChoiceQuestion(answers, formattedCorrectAnswers);
  }

  gradeTextQuestion(answer: string, correctAnswers: SessionAnswer[] | null) {
    const formattedCorrectAnswers = this.formatCorrectAnswers(correctAnswers, QuestionType.Text);

    if (formattedCorrectAnswers === null) {
      return null;
    }

    const normalizedAnswers = formattedCorrectAnswers.map(this._normalizeAnswer);
    return normalizedAnswers.includes(this._normalizeAnswer(answer));
  }

  private _gradeMultipleChoiceQuestion(answers: string[], correctAnswers: string[]) {
    if (answers.length !== correctAnswers.length) {
      return false;
    }

    const superSet = new Map<string, number>();
    for (const answer of correctAnswers) {
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
   * Returns a normalized variant of ``answer``, which is trimmed (on both ends),
   * has all letters uppercased, and has all spaces removed.
   * @param answer 
   * @returns a trimmed and uppercased ``answer`` with all spaces removed.
   */
  private _normalizeAnswer(answer: string) {
    return answer.trim().toUpperCase().replaceAll(' ', '');
  }
}
