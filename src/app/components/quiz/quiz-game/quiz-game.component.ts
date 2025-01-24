import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, inject, OnDestroy, signal, viewChildren } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GradedAnswer, QuizDetails } from '../../../services/quiz/types';
import { SharedQuizFormService } from '../../../services/shared/quiz-form/shared-quiz-form.service';
import { QuizSessionQuestionComponent } from '../quiz-session-question/quiz-session-question.component';
import { QuizStore } from '../../../store/quiz/quiz.store';
import { MatButtonModule } from '@angular/material/button';
import { AnswerService } from '../../../services/answer/answer.service';
import { Subscription } from 'rxjs';
import { QuizGameStatsComponent } from '../quiz-game-stats/quiz-game-stats.component';


@Component({
  selector: 'app-quiz-game',
  imports: [MatButtonModule, ReactiveFormsModule, QuizSessionQuestionComponent, QuizGameStatsComponent],
  templateUrl: './quiz-game.component.html',
  styleUrl: './quiz-game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizGameComponent implements OnDestroy  {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly sharedForm = inject(SharedQuizFormService);
  private readonly answerService = inject(AnswerService);
  protected readonly quiz = inject(QuizStore);
  protected readonly form = this.sharedForm.form;

  correctAnswers = signal<GradedAnswer[] | null>(null);

  questions = viewChildren(QuizSessionQuestionComponent);
  answersFeedback = computed(() => this.questions().map(q => q.userHasAnsweredCorrectly()));

  correctAnswersCount = computed(() => {
    const questions = this.questions();
    const correct = questions.filter(q => q.userHasAnsweredCorrectly());
    return correct.length;
  });

  wrongAnswersCount = computed(() => {
    const questions = this.questions();
    const wrong = questions.filter(q => q.userHasAnsweredCorrectly() === false);
    return wrong.length;
  });

  unansweredCount = computed(() => {
    const questions = this.questions();
    const unanswered = questions.filter(q => q.userHasAnsweredCorrectly() === null);
    return unanswered.length;
  });

  initialize(quiz: QuizDetails) {
    this.sharedForm.populate(quiz);
    this.quiz.updateQuiz(quiz);
    this.cdr.detectChanges();
  }

  gradeAllQuestions(event: SubmitEvent) {
    event.preventDefault();

    this._answerSub = this.answerService
      .getCorrectAnswersForAllQuestions(this.quiz.id(), this.quiz.version())
      .subscribe({
        next: (answers) => {
          this.form.disable();
          this.correctAnswers.set(answers);
          this.form.disable();
        },
        error: () => {
          //
        },
      });
  }

  private _answerSub?: Subscription;

  ngOnDestroy() {
    this.cdr.detach();
    this._answerSub?.unsubscribe();
  }
}
