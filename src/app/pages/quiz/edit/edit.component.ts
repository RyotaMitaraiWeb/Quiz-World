import { ChangeDetectionStrategy, Component, inject, input, OnDestroy, OnInit, signal } from '@angular/core';
import { QuizFormComponent } from '../../../components/quiz/quiz-form/quiz-form.component';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { questionTypes } from '../../../common/questionTypes';
import { QuizForm, QuestionForm, QuizBasicDataForm, AnswerField } from '../../../components/quiz/types';
import { QuizService } from '../../../services/quiz/quiz.service';
import { Answer, QuestionSubmission, QuizFormSubmission, SubmitQuestion } from '../../../services/quiz/types';
import { quizValidationRules } from '../../../common/validationRules/quiz-form';
import { generateUniqueId } from '../../../util/generateUniqueId';
import { SharedCreateEditQuizFormService } from '../../../services/shared/shared-create-edit-quiz-form.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit',
  imports: [QuizFormComponent, MatButtonModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditComponent implements OnDestroy, OnInit {
  private readonly quizService = inject(QuizService);
  private readonly router = inject(Router);
  private readonly sharedForm = inject(SharedCreateEditQuizFormService);

  readonly basicDataForm: QuizBasicDataForm = this.sharedForm.basicDataForm;

  readonly questionsForm = this.sharedForm.questionsForm;

  edit = signal(false);

  ngOnInit() {
    const id = this.id();
    this._getQuizSub = this.quizService.getQuizForEdit(id).subscribe({
      next: (v) => {
        this.questionsForm.clear();
        this.basicDataForm.controls.title.setValue(v.title);
        this.basicDataForm.controls.description.setValue(v.description);
        this.edit.set(true);

        const questions = v.questions
          .map(question => this.transformQuestionIntoControl(question));

        for (const question of questions) {
          this.questionsForm.push(question);
        }
      },
      error: () => {
        //
      },
    });
  }

  id = input.required<number>();

  submit(value: QuizForm) {
    const { basic, questions } = value;
    const quiz: QuizFormSubmission = {
      title: basic.value.title!,
      description: basic.value.description!,
      instantMode: basic.value.instantMode!,
      questions: this.transformQuestions(questions),
    };

    this._submitSub = this.quizService.edit(this.id(), quiz).subscribe({
      next: () => {
        this.router.navigate(['/quiz', this.id()]);
      },
      error: () => {
        //
      },
    });
  }

  private transformQuestions(form: FormArray<FormGroup<QuestionForm>>): SubmitQuestion[] {
    const formArray = form.value;
    const submission: SubmitQuestion[] = [];

    for (const question of formArray) {
      const questionSubmission: SubmitQuestion = {
        prompt: question.prompt,
        type: question.type,
        notes: question.notes,
        correctAnswers: [],
      };

      if (question.type !== questionTypes.text) {
        questionSubmission.wrongAnswers = [];
      }

      if (question.answers) {
        for (const answer of question.answers) {
          if (answer.correct) {
            questionSubmission.correctAnswers?.push({ answer: answer.value });
          } else {
            questionSubmission.wrongAnswers?.push({ answer: answer.value });
          }
        }
      }

      submission.push(question);
    }

    return submission;
  }

  private transformQuestionIntoControl(question: QuestionSubmission) {
    const group = new FormGroup<QuestionForm>(
      {
        prompt: new FormControl(question.prompt, { validators:
          [
            Validators.required,
            Validators.maxLength(quizValidationRules.questions.prompt.maxlength),
          ],
        }),
        type: new FormControl(question.type),
        notes: new FormControl(question.notes),
        randomId: new FormControl(generateUniqueId()),
        answers: new FormArray<FormGroup<AnswerField>>(
          question.answers.map((answer) => this.transformAnswerIntoControl(answer)),
        ),
      },
    );

    return group;
  }

  private transformAnswerIntoControl(answer: Answer) {
    return new FormGroup<AnswerField>(
      {
        value: new FormControl(answer.value, { validators: [
            Validators.required,
            Validators.maxLength(quizValidationRules.questions.answers.maxlength),
          ],
        }),
        correct: new FormControl(answer.correct),
        randomId: new FormControl(generateUniqueId()),
      },
  );
  }

  private _getQuizSub?: Subscription;
  private _submitSub?: Subscription;

  ngOnDestroy() {
    this._submitSub?.unsubscribe();
    this._getQuizSub?.unsubscribe();
  }
}
