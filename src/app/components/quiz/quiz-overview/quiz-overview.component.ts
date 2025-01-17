import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { QuizDetails } from '../../../services/quiz/types';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-quiz-overview',
  imports: [MatCardModule, MatChipsModule, DatePipe],
  templateUrl: './quiz-overview.component.html',
  styleUrl: './quiz-overview.component.scss',
})
export class QuizOverviewComponent {
  quiz = input.required<QuizDetails>();
}
