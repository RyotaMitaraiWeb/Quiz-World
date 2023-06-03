import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IAnswer } from '../../../../../types/components/answer.types';
import { IQuestion } from '../../../../../types/components/question.types';

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
  ],
  templateUrl: './single-choice.component.html',
  styleUrls: ['./single-choice.component.scss']
})
export class SingleChoiceComponent implements OnInit {
  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      prompt: ['', [Validators.required, Validators.maxLength(100)]],
      correctAnswer: ['', [Validators.required, Validators.maxLength(100)]],
      wrongAnswers: this.fb.array([
        this.fb.group({ wrongAnswer: ['', [Validators.required, Validators.maxLength(100)]] })
      ])
    });
  }

  ngOnInit(): void {
    this.form.patchValue({
      prompt: this.prompt,
      correctAnswer: this.correctAnswer.value,
    });

    const wrongAnswersForm = this.form.get('wrongAnswers') as FormArray;

    while (wrongAnswersForm.length) {
      wrongAnswersForm.removeAt(0);
    }

    this.wrongAnswers.forEach(wa => {
      const value = wa.value;
      wrongAnswersForm.push(this.fb.group({ wrongAnswer: value }));
    });
  }

  @Input() prompt = '';
  @Input() answers: IAnswer[] = [
    {
      value: '',
      correct: true,
    },
    {
      value: '',
      correct: false,
    }
  ];

  @Output() changeEvent = new EventEmitter<IQuestion>();

  triggerChange() {
    const values = this.form.value;
    const prompt = values.prompt || '';
    const answers: IAnswer[] = [];

    answers.push({
      value: values.correctAnswer || '',
      correct: true,
    });

    values.wrongAnswers?.forEach((wa) => {
      const value = wa.wrongAnswer || '';

      answers.push({
        value,
        correct: false,
      });
    });
    
    this.changeEvent.emit({
      prompt,
      answers,
    });
  }

  form = this.fb.group({
    prompt: ['', [Validators.required, Validators.maxLength(100)]],
    correctAnswer: ['', [Validators.required, Validators.maxLength(100)]],
    wrongAnswers: this.fb.array([
      this.fb.group({ wrongAnswer: ['', [Validators.required, Validators.maxLength(100)]] })
    ]),
  });

  addNewWrongAnswerField() {
    const wrongAnswersForm = this.form.get('wrongAnswers') as FormArray;
    wrongAnswersForm.push(this.fb.group({ wrongAnswer: ['', [Validators.required, Validators.maxLength(100)]] }));
    this.triggerChange();
  }

  removeWrongAnswerFieldAt(index: number) {
    const wrongAnswersForm = this.form.get('wrongAnswers') as FormArray;

    if (this.hasMoreThanOneWrongAnswerField) {
      wrongAnswersForm.removeAt(index);
      this.triggerChange();
    }
  }

  wrongAnswerFieldAtIndexErrors(index: number) {
    const wrongAnswersControls = this.form.controls.wrongAnswers.controls
    const errors = wrongAnswersControls[index].controls.wrongAnswer?.errors;
    return errors;
  }

  get wrongAnswersFormArray() {
    const wrongAnswers = this.form.get('wrongAnswers') as FormArray;
    const controls = wrongAnswers.controls;

    return controls;
  }

  get hasMoreThanOneWrongAnswerField() {
    return this.wrongAnswersFormArray.length > 1;
  }

  private get correctAnswer(): IAnswer {
    return this.answers.find(a => a.correct) || { value: '', correct: true };
  }

  private get wrongAnswers(): IAnswer[] {
    const answers = this.answers.filter(a => !a.correct);
    if (answers.length === 0) {
      return [{
        value: '',
        correct: false,
      }];
    }

    return answers;
  }
}
