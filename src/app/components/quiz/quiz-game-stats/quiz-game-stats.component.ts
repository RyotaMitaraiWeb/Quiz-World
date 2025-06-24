import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { PercentPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackbarMessages, snackbarAction, SNACKBAR_DURATION } from '../../../common/snackbar';

@Component({
  selector: 'app-quiz-game-stats',
  imports: [MatListModule, MatIconModule, MatCardModule, PercentPipe],
  templateUrl: './quiz-game-stats.component.html',
  styleUrl: './quiz-game-stats.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizGameStatsComponent {
  private readonly snackbar = inject(MatSnackBar);
  constructor() {
    effect(() => {
      const stats = this.stats();
      const instantMode = this.instantMode();
      const questions = this.questions();
      const unansweredQuestionsCount = stats.unanswered;

      if (unansweredQuestionsCount === 0 && instantMode && questions.length) {
        this.snackbar.open(snackbarMessages.success.quiz.gradedAllInstantMode, snackbarAction, {
          duration: SNACKBAR_DURATION,
        });
      }
    });
  }
  questions = input<(boolean | null)[]>([]);
  instantMode = input<boolean>();

  stats = computed(() => {
    const stats: QuestionsStats = {
      correct: 0,
      wrong: 0,
      unanswered: 0,
    };

    for (const question of this.questions()) {
      if (question) {
        stats.correct++;
      } else if (question === false) {
        stats.wrong++;
      } else {
        stats.unanswered++;
      }
    }

    return stats;
  });

  readonly statsStruct = computed(() => {
    const stats = this.stats();

    return [
      {
        icon: 'check_circle',
        count: stats.correct,
        extraLabel: `${this.pluralQuestionWord(stats.correct)} answered correctly`,
      },
      {
        icon: 'cancel',
        count: stats.wrong,
        extraLabel: `${this.pluralQuestionWord(stats.wrong)} answered incorrectly`,
      },
      {
        icon: 'pending',
        count: stats.unanswered,
        extraLabel: `${this.pluralQuestionWord(stats.unanswered)} still awaiting your answer`,
        show: () => this.instantMode() || false,
      },
    ] as StatsStruct[];
  });

  private pluralQuestionWord(questions: number) {
    return questions === 1 ? 'question' : 'questions';
  }
}

interface QuestionsStats {
  correct: number;
  wrong: number;
  unanswered: number;
}

interface StatsStruct {
  icon: string;
  count: number;
  extraLabel: string;
  show?: () => boolean;
}