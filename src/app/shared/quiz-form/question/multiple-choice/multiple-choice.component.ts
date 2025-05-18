import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IAnswer } from '../../../../../types/components/answer.types';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { questionTypes } from '../../../../constants/question-types.constants';
import { MatDividerModule } from '@angular/material/divider';
import { AnswersManagersFactoryService } from '../../../../features/answers-managers-factory/answers-managers-factory.service';
import { MultipleChoiceAnswersManager } from '../../../../util/AnswersManager/managers/MultipleChoice/MultipleChoiceAnswersManager';
import { validationRules } from '../../../../constants/validationRules.constants';


@Component({
  selector: 'app-multiple-choice',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatDividerModule,
  ],
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.scss']
})
export class MultipleChoiceComponent {

  private readonly manager: MultipleChoiceAnswersManager;

  constructor(
    private readonly fb: FormBuilder,
    private readonly factory: AnswersManagersFactoryService
  ) {
    this.manager = factory.createManager('multi', this.form.controls.answers);
  }

  ngOnInit(): void {
    this.manager.form = this.form.controls.answers;
  }

  protected questionValidationRules = {
    answer: validationRules.quiz.question.answers.value,
    prompt: validationRules.quiz.question.prompt,
  }

  @Input({ required: true }) form = this.fb.group({
    prompt: ['', [Validators.required, Validators.maxLength(this.questionValidationRules.prompt.maxlength)]],
    answers: this.fb.array([
      this.fb.group({
        value: ['', [Validators.required, Validators.maxLength(this.questionValidationRules.answer.maxlength)]],
        correct: [true],
      }),
      this.fb.group({ 
        value: ['', [Validators.required, Validators.maxLength(this.questionValidationRules.answer.maxlength)]],
        correct: [false],
      }),
    ]),
    type: [questionTypes.multi],
    notes: ['', [Validators.maxLength(validationRules.quiz.question.notes.maxLength)]],
  });

  protected addNewWrongAnswerField(event: Event) {
    event.preventDefault();
    this.manager.addField('', false);
  }

  protected removeWrongAnswerFieldAt(event: Event, index: number) {
    event.preventDefault();
    this.manager.removeFieldAt(index, false);
  }

  protected addNewCorrectAnswerField(event: Event) {
    event.preventDefault();
    this.manager.addField('', true);
  }

  protected removeCorrectAnswerFieldAt(event: Event, index: number) {
    event.preventDefault();
    this.manager.removeFieldAt(index, true);
  }

  protected getErrorsAt(index: number, correct: boolean) {
    return this.manager.getErrorsAt(index, correct);
  }

  protected get correctAnswers() {
    return this.manager.getAnswersOfCorrectness(true);
  }

  protected get wrongAnswers() {
    return this.manager.getAnswersOfCorrectness(false);
  }

  protected actualIndex(index: number, correct: boolean) {
    return this.manager.getActualIndex(index, correct);
  }

  protected get canAddFields() {
    return this.manager.canAddAnswersField;
  }

  protected get canRemoveCorrectAnswersFields() {
    return this.manager.canRemoveCorrectAnswersFields;
  }

  protected get canRemoveWrongAnswersFields() {
    return this.manager.canRemoveWrongAnswersField;
  }
}
