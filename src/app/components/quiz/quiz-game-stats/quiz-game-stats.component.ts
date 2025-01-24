import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { PercentPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-quiz-game-stats',
  imports: [MatListModule, MatIconModule, MatCardModule, PercentPipe],
  templateUrl: './quiz-game-stats.component.html',
  styleUrl: './quiz-game-stats.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizGameStatsComponent {
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
        extraLabel: 'questions answered correctly',
      },
      {
        icon: 'cancel',
        count: stats.wrong,
        extraLabel: 'questions answered incorrectly',
      },
      {
        icon: 'pending',
        count: stats.unanswered,
        extraLabel: 'questions still awaiting your answer',
        show: () => this.instantMode() || false,
      },
    ] as StatsStruct[];
  });
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