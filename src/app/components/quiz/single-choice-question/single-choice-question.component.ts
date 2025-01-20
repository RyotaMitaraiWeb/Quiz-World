import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { SharedQuizFormService } from '../../../services/shared/quiz-form/shared-quiz-form.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SessionQuestion } from '../../../services/quiz/types';
@Component({
  selector: 'app-single-choice-question',
  imports: [MatRadioModule, MatCardModule, ReactiveFormsModule],
  templateUrl: './single-choice-question.component.html',
  styleUrl: './single-choice-question.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleChoiceQuestionComponent {
  private readonly sharedForm = inject(SharedQuizFormService);
  question = input.required<SessionQuestion>();
  protected questionId = computed(() => this.question().id);

  form = computed<ReturnType<typeof this.sharedForm.mapControlToQuestion>>(() => this.sharedForm.mapControlToQuestion(this.questionId()));
}
