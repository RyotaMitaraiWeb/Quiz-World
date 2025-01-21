import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { DatePipe } from '@angular/common';
import { QuizStore } from '../../../store/quiz/quiz.store';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-quiz-overview',
  imports: [MatCardModule, MatChipsModule, DatePipe, MatIconModule],
  templateUrl: './quiz-overview.component.html',
  styleUrl: './quiz-overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizOverviewComponent {
  protected readonly quiz = inject(QuizStore);
}
