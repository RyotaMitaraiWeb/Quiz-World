import { inject, Injectable } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { questionTypes, shortQuestionType, shortQuestionTypes } from '../../../common/questionTypes';
import { QuizDetails, SessionQuestion } from '../../quiz/types';

@Injectable({
  providedIn: 'root',
})
export class SharedQuizFormService {
  private readonly formBuilder = inject(FormBuilder);
  readonly form = this.formBuilder.array([]) as unknown as FormArray<ReturnType<typeof this._addControl>>;

  populate(quiz: QuizDetails) {
    const questions = quiz.questions;

    for (const question of questions) {
      const control = this._createQuestionControl(question);
      this.form.push(control);
    }
  }

  mapControlToQuestion(questionId: string) {
    return this.form.controls.find(c => c.value.id === questionId);
  }

  private _addControl(value: unknown, questionId: string, type: shortQuestionType) {
    const group = this.formBuilder.group({
      currentAnswer: type === shortQuestionTypes[questionTypes.multi] ? value : [value, [Validators.required]],
      id: [questionId],
      type: [type],
    });

    if (type === shortQuestionTypes[questionTypes.multi]) {
      group.setErrors({ required: true });
    }

    return group;
  }

  private _createQuestionControl(question: SessionQuestion) {
    let value: unknown;
    switch (question.type) {
      case shortQuestionTypes.Text:
        value = '';
        break;
      case shortQuestionTypes.MultipleChoice:
        value = [];
        break;
      default:
        value = null;
    }

    return this._addControl(value, question.id, question.type);
  }
}
