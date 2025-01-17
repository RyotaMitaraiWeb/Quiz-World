import { ChangeDetectionStrategy, Component, inject, input, OnDestroy, OnInit, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { QuizDetails } from '../../services/quiz/types';
import { QuizService } from '../../services/quiz/quiz.service';
import { MatTabsModule } from '@angular/material/tabs';
import { QuizOverviewComponent } from '../../components/quiz/quiz-overview/quiz-overview.component';

@Component({
  selector: 'app-quiz-details',
  imports: [MatTabsModule, QuizOverviewComponent],
  templateUrl: './quiz-details.component.html',
  styleUrl: './quiz-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizDetailsComponent implements OnInit, OnDestroy {
  private readonly quizService = inject(QuizService);

  id = input.required<number>();
  quiz = signal<QuizDetails>(QuizService.emptyQuiz);

  ngOnInit(): void {
    this._quizSub = this.quizService.getById(this.id()).subscribe({
      next: (quiz) => {
        this.quiz.set(quiz);
      },
      error: () => {
        //
      },
    });
  }

  private _quizSub?: Subscription;

  ngOnDestroy(): void {
    this._quizSub?.unsubscribe();
  }
}
