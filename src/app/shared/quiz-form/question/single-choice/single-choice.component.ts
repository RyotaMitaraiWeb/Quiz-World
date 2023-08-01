import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IAnswer } from '../../../../../types/components/answer.types';
import { IQuestion } from '../../../../../types/components/question.types';
import { AnswersManager } from '../../../../util/AnswersManager/AnswersManager';
import { questionTypes } from '../../../../constants/question-types.constants';
import { MatDividerModule } from '@angular/material/divider';

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
  correctAnswersManager!: AnswersManager;
  wrongAnswersManager!: AnswersManager;

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    this.correctAnswersManager = new AnswersManager(this.form.controls.correctAnswers, this.fb);
    this.wrongAnswersManager = new AnswersManager(this.form.controls.wrongAnswers, this.fb);
  }
  /**
   * Bind this to the ``name`` of the disabled radio button for the correct answer.
   * This allows each "correct answer" to have this button checked and prevents
   * an ``ExpressionChangedAfterItHasBeenCheckedError``.
   */
  protected uniqueName = Date.now().toString();

  @Input({ required: true }) form = this.fb.group({
    prompt: ['', [Validators.required, Validators.maxLength(100)]],
    correctAnswers: this.fb.array([
      this.fb.group({ answer: ['', [Validators.required, Validators.maxLength(100)]] })
    ]),
    wrongAnswers: this.fb.array([
      this.fb.group({ answer: ['', [Validators.required, Validators.maxLength(100)]] })
    ]),
    type: [questionTypes.single]
  });

  addNewWrongAnswerField(event: Event) {
    event.preventDefault();
    this.wrongAnswersManager.addField();
  }

  removeWrongAnswerFieldAt(event: Event, index: number) {
    event.preventDefault();
    this.wrongAnswersManager.removeFieldAt(index);
  }
}
