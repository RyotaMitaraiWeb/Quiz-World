import { ChangeDetectionStrategy, Component, inject, input, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { QuizService } from '../../services/quiz/quiz.service';
import { MatTabsModule } from '@angular/material/tabs';
import { QuizOverviewComponent } from '../../components/quiz/quiz-overview/quiz-overview.component';
import { QuizGameComponent } from '../../components/quiz/quiz-game/quiz-game.component';
import { QuizStore } from '../../store/quiz/quiz.store';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-quiz-details',
  imports: [MatTabsModule, QuizOverviewComponent, QuizGameComponent],
  templateUrl: './quiz-details.component.html',
  styleUrl: './quiz-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizDetailsComponent implements OnDestroy, AfterViewInit {
  private readonly quizService = inject(QuizService);
  protected readonly quiz = inject(QuizStore);
  private readonly title = inject(Title);

  id = input.required<number>();

  @ViewChild(QuizGameComponent)
  private game!: QuizGameComponent;

  ngAfterViewInit(): void {
    this._quizSub = this.quizService.getById(this.id()).subscribe({
      next: (quiz) => {
        this.quiz.updateQuiz(quiz);
        this.title.setTitle(`${quiz.title} quiz | Quiz World`);
        this.game.initialize(quiz);
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
