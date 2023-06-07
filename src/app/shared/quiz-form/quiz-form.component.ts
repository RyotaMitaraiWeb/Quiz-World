import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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
export class QuizFormComponent implements OnInit {
  constructor(private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    while (this.form.controls.questions.controls.length) {
      this.form.controls.questions.removeAt(0);
    }

    this.questions.forEach(q => {      
      const correctAnswersFormArray = this.fb.array([this.fb.group({ answer: ['', [Validators.required, Validators.maxLength(100)]] })]);
      const wrongAnswersFormArray = this.fb.array([this.fb.group({ answer: ['', [Validators.required, Validators.maxLength(100)]] })]);

      correctAnswersFormArray.removeAt(0);
      wrongAnswersFormArray.removeAt(0);

      q.answers.forEach(a => {
        if (a.correct) {
          correctAnswersFormArray.push(this.fb.group({ answer: [a.value, [Validators.required, Validators.maxLength(100)]] }));
        } else {
          wrongAnswersFormArray.push(this.fb.group({ answer: [a.value, [Validators.required, Validators.maxLength(100)]] }));
        }
      });

      const questionControl = this.fb.group(
        {
          prompt: q.prompt,
          correctAnswers: correctAnswersFormArray,
          wrongAnswers: wrongAnswersFormArray,
          type: q.type as string,
        }
      );

      this.form.controls.questions.push(questionControl);
    });
  }

  @Input() questions: IQuestionSubmission[] = [
    {
      prompt: '',
      answers: [
        {
          value: '',
          correct: true,
        },
        {
          value: '',
          correct: false,
        }
      ],
      order: 1,
      type: 'single',
    },
  ];

  form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', [Validators.maxLength(300)]],
    questions: this.fb.array(
      [this.fb.group(
        {
          prompt: ['', [Validators.required, Validators.maxLength(100)]],
          correctAnswers: this.fb.array([this.fb.group({ answer: ['', [Validators.required, Validators.maxLength(100)]] })]),
          wrongAnswers: this.fb.array([this.fb.group({ answer: ['', [Validators.required, Validators.maxLength(100)]] })]),
          type: ['single'],
        }
      )]
    ),
    instantMode: [false, [Validators.required]],
  });

  addQuestion(event: Event) {
    event.preventDefault();
    this.form.controls.questions.push(
      this.fb.group(
        {
          prompt: ['', [Validators.required, Validators.maxLength(100)]],
          correctAnswers: this.fb.array([this.fb.group({ answer: ['', [Validators.required, Validators.maxLength(100)]] })]),
          wrongAnswers: this.fb.array([this.fb.group({ answer: ['', [Validators.required, Validators.maxLength(100)]] })]),
          type: ['single'],
        }
      )
    )
  }

  removeQuestionAt(index: number, event: Event) {
    event.preventDefault();
    if (index < 0 || index >= this.form.controls.questions.length) {
      throw new Error('Field does not exist!');
    }
    
    if (this.hasMoreThanOneQuestion) {
      this.form.controls.questions.removeAt(index);
    } else {
      throw new Error('You cannot remove the only question remaining!');
    }
  }

  protected get hasMoreThanOneQuestion() {
    return this.form.controls.questions.length > 1;
  }
}
