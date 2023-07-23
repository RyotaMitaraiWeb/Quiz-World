import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { QuestionModule } from './question/question.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IQuestionSubmission } from '../../../types/components/question.types';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { IQuizFormSubmission } from '../../../types/components/quiz-form.types';
import { questionTypes } from '../../constants/question-types.constants';

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

  @ViewChild('autosize') protected autosize!: CdkTextareaAutosize;

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
          prompt: [q.prompt, [Validators.required, Validators.maxLength(100)]],
          correctAnswers: correctAnswersFormArray,
          wrongAnswers: wrongAnswersFormArray,
          type: q.type,
        }
      );

      this.form.controls.questions.push(questionControl);
    });

    this.form.controls.title.setValue(this.title);
    this.form.controls.description.setValue(this.description);
    this.form.controls.instantMode.setValue(this.instantMode);
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
      type: questionTypes.single,
    },
  ];

  @Input() title = '';
  @Input() description = '';
  @Input() instantMode = false;
  @Output() submitEvent = new EventEmitter<IQuizFormSubmission>();

  form = this.fb.group({
    title: [this.title, [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
    description: [this.description, [Validators.required, Validators.maxLength(300)]],
    questions: this.fb.array(
      [this.fb.group(
        {
          prompt: ['', [Validators.required, Validators.maxLength(100)]],
          correctAnswers: this.fb.array([this.fb.group({ answer: ['', [Validators.required, Validators.maxLength(100)]] })]),
          wrongAnswers: this.fb.array([this.fb.group({ answer: ['', [Validators.required, Validators.maxLength(100)]] })]),
          type: [questionTypes.single],
        }
      )]
    ),
    instantMode: [this.instantMode],
  });

  
  /**
   * Adds an empty single-choice question to the questions control of the form.
   * @param event 
   */
  addQuestion(event: Event) {
    event.preventDefault();
    this.form.controls.questions.push(
      this.fb.group(
        {
          prompt: ['', [Validators.required, Validators.maxLength(100)]],
          correctAnswers: this.fb.array([this.fb.group({ answer: ['', [Validators.required, Validators.maxLength(100)]] })]),
          wrongAnswers: this.fb.array([this.fb.group({ answer: ['', [Validators.required, Validators.maxLength(100)]] })]),
          type: [questionTypes.single],
        }
      )
    )
  }

  /**
   * Removes the control at the given ``index`` of the questions control.
   * @param index 
   * @param event
   * @throws if the form has only one question or the field at the given index does not exist.
   */
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

  /**
   * Emits the component's ``submitEvent``, passing the form's current value.
   * @param event 
   */
  onSubmit(event: Event) {
    event.preventDefault();
    const value = this.form.value as IQuizFormSubmission;
    this.submitEvent.emit(value);
  }

  protected get hasMoreThanOneQuestion() {
    return this.form.controls.questions.length > 1;
  }
}
