import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { QuestionTypesStore } from '../../../store/question/questionTypes.store';
import { questionTypes } from '../../../common/questionTypes';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { PercentPipe } from '@angular/common';

@Component({
  selector: 'app-quiz-form-summary',
  imports: [
    PercentPipe,
    MatCardModule,
    MatIconModule,
    MatListModule,
  ],
  templateUrl: './quiz-form-summary.component.html',
  styleUrl: './quiz-form-summary.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizFormSummaryComponent {
  private readonly questionTypesStore = inject(QuestionTypesStore);

  protected readonly questionsCount = computed(() => this.questionTypesStore.total());

  protected readonly stats = computed<Stat[]>(() => (
    [
      {
        label: 'Single-choice questions',
        icon: 'radio_button_checked',
        count: this.questionTypesStore[questionTypes.single](),
      },
      {
        label: 'Multiple-choice questions',
        icon: 'checklist',
        count: this.questionTypesStore[questionTypes.multi](),
      },
      {
        label: 'Text questions',
        icon: 'text_fields',
        count: this.questionTypesStore[questionTypes.text](),
      },
  ]
  ));
}

interface Stat {
  label: string;
  icon: string;
  count: number
}