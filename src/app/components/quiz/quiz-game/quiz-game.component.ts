import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { QuizDetails } from '../../../services/quiz/types';
import { SharedQuizFormService } from '../../../services/shared/quiz-form/shared-quiz-form.service';
import { QuizSessionQuestionComponent } from '../quiz-session-question/quiz-session-question.component';
import { QuizStore } from '../../../store/quiz/quiz.store';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-quiz-game',
  imports: [MatButtonModule, ReactiveFormsModule, QuizSessionQuestionComponent],
  templateUrl: './quiz-game.component.html',
  styleUrl: './quiz-game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizGameComponent implements OnDestroy  {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly sharedForm = inject(SharedQuizFormService);
  protected readonly quiz = inject(QuizStore);
  protected readonly form = this.sharedForm.form;

  initialize(quiz: QuizDetails) {
    this.sharedForm.populate(quiz);
    this.quiz.updateQuiz(quiz);
    this.cdr.detectChanges();
  }

  gradeAllQuestions(event: SubmitEvent) {
    event.preventDefault();
  }

  ngOnDestroy() {
    this.cdr.detach();
  }
}
