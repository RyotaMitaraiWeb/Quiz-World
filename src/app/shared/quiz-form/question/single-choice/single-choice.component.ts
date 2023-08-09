import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { questionTypes } from '../../../../constants/question-types.constants';
import { MatDividerModule } from '@angular/material/divider';
import { SingleChoiceAnswersManager } from '../../../../util/AnswersManager/managers/SingleChoice/SingleChoiceAnswersManager';
import { AnswersManagersFactoryService } from '../../../../features/answers-managers-factory/answers-managers-factory.service';
import { validationRules } from '../../../../constants/validationRules.constants';

@Component({
  selector: 'app-single-choice',
  standalone: true,
  imports: [
    CommonModule,
    MatRadioModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule
  ],
  templateUrl: './single-choice.component.html',
  styleUrls: ['./single-choice.component.scss']
})
export class SingleChoiceComponent implements OnInit {
  private readonly manager: SingleChoiceAnswersManager;

  constructor(
    private readonly fb: FormBuilder,
    private readonly factory: AnswersManagersFactoryService,
  ) {
    this.manager = factory.createManager('single', this.form.controls.answers);
  }

  protected questionValidationRules = {
    answer: validationRules.quiz.question.answers.value,
    prompt: validationRules.quiz.question.prompt,
  }

  ngOnInit(): void {
    this.manager.form = this.form.controls.answers;
  }
  /**
   * Bind this to the ``name`` of the disabled radio button for the correct answer.
   * This allows each "correct answer" to have this button checked and prevents
   * an ``ExpressionChangedAfterItHasBeenCheckedError``.
   */
  protected uniqueName = Date.now().toString();

  @Input({ required: true }) form = this.fb.group({
    prompt: ['', [Validators.required, Validators.maxLength(this.questionValidationRules.prompt.maxlength)]],
    answers: this.fb.array([
      this.fb.group({
        value: ['', [Validators.required, Validators.maxLength(this.questionValidationRules.answer.maxlength)]],
        correct: [true],
      }
      ),
      this.fb.group(
        {
          value: ['', [Validators.required, Validators.maxLength(this.questionValidationRules.answer.maxlength)]],
          correct: [false],
        }
      )
    ]),
    type: [questionTypes.single]
  });

  protected get correctAnswer() {
    return this.manager.correctAnswer;
  }

  protected get wrongAnswers() {
    return this.manager.wrongAnswers;
  }

  protected getErrorsAt(index: number) {
    return this.manager.getErrorsAt(index);
  }

  protected addField(event: Event) {
    event.preventDefault();
    this.manager.addField();
  }

  protected removeFieldAt(index: number, event: Event) {
    event.preventDefault();
    this.manager.removeFieldAt(index);
  }

  protected get canAddFields() {
    return this.manager.canAddWrongAnswerFields;
  }

  protected get canRemoveFields() {
    return this.manager.canRemoveWrongAnswerFields;
  }

  protected getActualIndex(index: number) {
    return this.manager.getActualIndex(index);
  }
}
