import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { SessionAnswer, SessionQuestion } from '../../../services/quiz/types';
import { SharedQuizFormService } from '../../../services/shared/quiz-form/shared-quiz-form.service';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { QuestionGradeDirective } from '../../../directives/question-grade/question-grade.directive';

@Component({
  selector: 'app-text-question',
  imports: [MatInputModule, ReactiveFormsModule, QuestionGradeDirective],
  templateUrl: './text-question.component.html',
  styleUrl: './text-question.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextQuestionComponent {
  private readonly sharedForm = inject(SharedQuizFormService);
  question = input.required<SessionQuestion>();
  protected questionId = computed(() => this.question().id);

  form = computed<ReturnType<typeof this.sharedForm.mapControlToQuestion>>(() => this.sharedForm.mapControlToQuestion(this.questionId()));
  correctAnswers = input<SessionAnswer[] | null>(null);
  readonly answerIsCorrect = input<boolean | null>(null);
}
