import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { QuestionModule } from './question/question.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IQuestion } from '../../../types/components/question.types';
import { IQuestionSubmission } from '../../../types/components/question.types';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.scss'],
  standalone: true,
  imports: [CommonModule,
    QuestionModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class QuizFormComponent {
  constructor(private readonly fb: FormBuilder) {

  }
  @Input() questions: IQuestionSubmission[] = [
    {
      prompt: '',
      answers: [],
      order: 1,
      type: 'single',
    },
  ];

  getQuestionAtIndex(index: number): IQuestion {
    const question = this.questions[index];
    const { prompt, answers } = question;
    return { prompt, answers };
  }

  form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', [Validators.maxLength(300)]],
    instantMode: [false, [Validators.required]],
  });

  addQuestion(event?: Event) {
    event?.preventDefault();

    this.questions.push({
      prompt: '',
      answers: [],
      type: 'single',
      order: this.questions.length + 1,
    })
  }

  removeQuestion(index: number, event?: Event) {
    event?.preventDefault();
    this.questions.splice(index, 1);
  }
}
