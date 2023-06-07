import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IAnswer } from '../../../../../types/components/answer.types';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IQuestion } from '../../../../../types/components/question.types';
import { AnswersManager } from '../../../../util/AnswersManager/AnswersManager';


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
    MatTooltipModule
  ],
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.scss']
})
export class MultipleChoiceComponent {
  correctAnswersManager!: AnswersManager;
  wrongAnswersManager!: AnswersManager;

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    this.correctAnswersManager = new AnswersManager(this.form.controls.correctAnswers, this.fb);
    this.wrongAnswersManager = new AnswersManager(this.form.controls.wrongAnswers, this.fb);
  }

  @Input({ required: true }) form = this.fb.group({
    prompt: ['', [Validators.required, Validators.maxLength(100)]],
    correctAnswers: this.fb.array([
      this.fb.group({ answer: ['', [Validators.required, Validators.maxLength(100)]] })
    ]),
    wrongAnswers: this.fb.array([
      this.fb.group({ answer: ['', [Validators.required, Validators.maxLength(100)]] })
    ]),
    type: ['multi']
  });

  addNewWrongAnswerField(event: Event) {
    event.preventDefault();
    this.wrongAnswersManager.addField();
  }

  removeWrongAnswerFieldAt(event: Event, index: number) {
    event.preventDefault();
    this.wrongAnswersManager.removeFieldAt(index);
  }

  addNewCorrectAnswerField(event: Event) {
    event.preventDefault();
    this.correctAnswersManager.addField();
  }

  removeCorrectAnswerFieldAt(event: Event, index: number) {
    event.preventDefault();
    this.correctAnswersManager.removeFieldAt(index);
  }
}
