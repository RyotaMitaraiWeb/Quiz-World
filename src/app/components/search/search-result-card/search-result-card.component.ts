import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { QuizListItem } from '../../../services/quiz/types';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-search-result-card',
  imports: [MatCardModule, MatChipsModule, MatRippleModule, RouterModule],
  templateUrl: './search-result-card.component.html',
  styleUrl: './search-result-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultCardComponent {
  quiz = input.required<QuizListItem>();

  readonly DESCRIPTION_MAX_LENGTH = 50;

  protected readonly shortenedDescription = computed(() => {
    const description = this.quiz().description;
    if (description.length <= this.DESCRIPTION_MAX_LENGTH) {
      return description;
    }

    return description.slice(0, this.DESCRIPTION_MAX_LENGTH) + '...';
  });
}
