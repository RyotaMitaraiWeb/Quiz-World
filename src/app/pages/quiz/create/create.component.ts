import { ChangeDetectionStrategy, Component, inject, OnDestroy } from '@angular/core';
import { QuizFormComponent } from '../../../components/quiz/quiz-form/quiz-form.component';
import { MatButtonModule } from '@angular/material/button';
import { QuestionForm, QuizForm } from '../../../components/quiz/types';
import { QuizService } from '../../../services/quiz/quiz.service';
import { QuizFormSubmission, SubmitQuestion } from '../../../services/quiz/types';
import { FormArray, FormGroup } from '@angular/forms';
import { questionTypes } from '../../../common/questionTypes';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create',
  imports: [QuizFormComponent, MatButtonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateQuizComponent implements OnDestroy {
  private readonly quizService = inject(QuizService);
  private readonly router = inject(Router);

  submit(value: QuizForm) {
    const { basic, questions } = value;
    const quiz: QuizFormSubmission = {
      title: basic.value.title!,
      description: basic.value.description!,
      instantMode: basic.value.instantMode!,
      questions: this.transformQuestions(questions),
    };

    this.quizService.create(quiz).subscribe({
      next: (v) => {
        this.router.navigate(['/quiz', v.id]);
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

  private _submitSub?: Subscription;

  ngOnDestroy() {
    this._submitSub?.unsubscribe();
  }
}

