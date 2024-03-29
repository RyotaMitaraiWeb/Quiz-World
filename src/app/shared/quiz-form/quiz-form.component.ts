import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { QuestionModule } from './question/question.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IQuestionSubmission } from '../../../types/components/question.types';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { IQuizFormSubmission } from '../../../types/components/quiz-form.types';
import { questionTypes } from '../../constants/question-types.constants';
import { validationRules } from '../../constants/validationRules.constants';
import { DisableOnLoadingDirective } from '../directives/disable-on-loading/disable-on-loading.directive';

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
    DisableOnLoadingDirective,
  ]
})
export class QuizFormComponent implements OnInit {
  constructor(
    private readonly fb: FormBuilder
  ) { }

  protected quizValidationRules = {
    title: validationRules.quiz.title,
    description: validationRules.quiz.description,
  };

  @ViewChild('autosize') protected autosize!: CdkTextareaAutosize;

  ngOnInit(): void {
    while (this.form.controls.questions.controls.length) {
      this.form.controls.questions.removeAt(0);
    }

    if (this.edit) {
      this.form.controls.instantMode.disable();
    }

    this.form.controls.title.setValue(this.title);
    this.form.controls.description.setValue(this.description);

    this.questions.forEach(q => {
      const answersFormArray = q.answers.map(a =>
        this.fb.group(
          {
            value: [a.value, [Validators.required, Validators.maxLength(validationRules.quiz.question.answers.value.maxlength)]],
            correct: [a.correct]
          }
        )

      );

      const group = this.fb.group({
        prompt: [q.prompt, [Validators.required, Validators.maxLength(validationRules.quiz.question.prompt.maxlength)]],
        answers: this.fb.array(answersFormArray),
        type: [q.type],
        notes: [q.notes || '', [Validators.maxLength(validationRules.quiz.question.notes.maxLength)]],
      });

      this.form.controls.questions.push(group);
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
      type: questionTypes.single,
      notes: '',
    },
  ];

  @Input() title = '';
  @Input() description = '';
  @Output() submitEvent = new EventEmitter<IQuizFormSubmission>();
  @Input() edit = false;

  form = this.fb.group({
    title: [this.title, [Validators.required, Validators.minLength(this.quizValidationRules.title.minlength), Validators.maxLength(this.quizValidationRules.title.maxlength)]],
    description: [this.description, [Validators.required, Validators.maxLength(500)]],
    questions: this.fb.array(
      [
        this.fb.group(
          {
            prompt: ['', [Validators.required, Validators.maxLength(validationRules.quiz.question.prompt.maxlength)]],
            answers: this.fb.array(
              [
                this.fb.group({
                  value: ['', [Validators.required, Validators.maxLength(validationRules.quiz.question.answers.value.maxlength)]],
                  correct: [true],
                }),
                this.fb.group({
                  value: ['', [Validators.required, Validators.maxLength(validationRules.quiz.question.answers.value.maxlength)]],
                  correct: [false],
                })
              ]
            ),
            type: [questionTypes.single],
            notes: ['', [Validators.maxLength(validationRules.quiz.question.notes.maxLength)]],
          }
        )]
    ),
    instantMode: [false],
  });

  /**
   * Adds an empty single-choice question to the questions control of the form.
   * @param event 
   */
  addQuestion(event: Event) {
    event.preventDefault();
    if (this.form.controls.questions.length < 100) {
      this.form.controls.questions.push(
        this.fb.group(
          {
            prompt: ['', [Validators.required, Validators.maxLength(validationRules.quiz.question.prompt.maxlength)]],
            answers: this.fb.array(
              [
                this.fb.group({
                  value: ['', [Validators.required, Validators.maxLength(validationRules.quiz.question.answers.value.maxlength)]],
                  correct: [true],
                }),
                this.fb.group({
                  value: ['', [Validators.required, Validators.maxLength(validationRules.quiz.question.answers.value.maxlength)]],
                  correct: [false],
                })
              ]
            ),
            type: [questionTypes.single],
            notes: ['', [Validators.maxLength(validationRules.quiz.question.notes.maxLength)]],
          }
        )
      );
    }
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
