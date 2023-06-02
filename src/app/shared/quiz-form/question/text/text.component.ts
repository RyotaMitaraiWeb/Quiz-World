import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IAnswer } from '../../../../../types/components/answer.types';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IQuestion } from '../../../../../types/components/question.types';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-text',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent {
  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      prompt: [this.prompt, [Validators.required, Validators.maxLength(100)]],
      correctAnswers: this.fb.array([
        this.fb.group({ correctAnswer: ['', [Validators.required, Validators.maxLength(100)]] })
      ]),
      
    });
  }
  ngOnInit(): void {
    this.form.patchValue({
      prompt: this.prompt,
    });

    const correctAnswersForm = this.form.get('correctAnswers') as FormArray;
    while (correctAnswersForm.length) {
      correctAnswersForm.removeAt(0);
    }

    this.correctAnswers.forEach(ca => {
      const value = ca.value;
      correctAnswersForm.push(this.fb.group({ correctAnswer: value }));
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

  @Output() changeEvent = new EventEmitter<IQuestion>()

  form = this.fb.group({
    prompt: [this.prompt, [Validators.required, Validators.maxLength(100)]],
    correctAnswers: this.fb.array([
      this.fb.group({ correctAnswer: ['', [Validators.required, Validators.maxLength(100)]] })
    ]),
  });

  triggerChange() {
    const values = this.form.value;
    const prompt = values.prompt || '';
    const answers: IAnswer[] = [];    

    values.correctAnswers?.forEach((ca) => {
      const value = ca.correctAnswer || '';

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

  addNewCorrectAnswerField() {
    const correctAnswersForm = this.form.get('correctAnswers') as FormArray;
    correctAnswersForm.push(this.fb.group({ correctAnswer: ['', [Validators.required, Validators.maxLength(100)]] }));
    this.triggerChange();
  }

  removeCorrectAnswerFieldAt(index: number) {
    const correctAnswersForm = this.form.get('correctAnswers') as FormArray;

    if (this.hasMoreThanOneCorrectAnswerField) {
      correctAnswersForm.removeAt(index);
      this.triggerChange();
    }
  }

  correctAnswerFieldAtIndexErrors(index: number) {
    const correctAnswersControls = this.form.controls.correctAnswers.controls
    const errors = correctAnswersControls[index].controls.correctAnswer?.errors;
    return errors;
  }

  get correctAnswersFormArray() {
    const correctAnswers = this.form.get('correctAnswers') as FormArray;
    const controls = correctAnswers.controls;

    return controls;
  }

  get hasMoreThanOneCorrectAnswerField() {
    return this.correctAnswersFormArray.length > 1;
  }

  private get correctAnswers(): IAnswer[] {
    const answers = this.answers.filter(a => a.correct);
    if (answers.length === 0) {
      return [{
        value: '',
        correct: false,
      }];
    }

    return answers;
  }
}
