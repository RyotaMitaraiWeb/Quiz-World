import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { SharedQuizFormService } from '../../../services/shared/quiz-form/shared-quiz-form.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SessionAnswer, SessionQuestion } from '../../../services/quiz/types';
import { QuestionGradeDirective } from '../../../directives/question-grade/question-grade.directive';
@Component({
  selector: 'app-single-choice-question',
  imports: [MatRadioModule, MatCardModule, ReactiveFormsModule, QuestionGradeDirective],
  templateUrl: './single-choice-question.component.html',
  styleUrl: './single-choice-question.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleChoiceQuestionComponent {
  private readonly sharedForm = inject(SharedQuizFormService);
  question = input.required<SessionQuestion>();
  correctAnswers = input<SessionAnswer[] | null>(null);
  protected questionId = computed(() => this.question().id);

  readonly form = computed<ReturnType<typeof this.sharedForm.mapControlToQuestion>>(() => this.sharedForm.mapControlToQuestion(this.questionId()));

  protected answerIsCorrect(answerId: string): boolean | null {
    const correctAnswers = this.correctAnswers();
    if (!correctAnswers) {
      return null;
    }

    const correctAnswer = correctAnswers[0];
    return correctAnswer.id === answerId;
  }
}
