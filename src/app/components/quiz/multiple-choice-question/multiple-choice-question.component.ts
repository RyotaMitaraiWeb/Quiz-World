import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { SessionAnswer, SessionQuestion } from '../../../services/quiz/types';
import { SharedQuizFormService } from '../../../services/shared/quiz-form/shared-quiz-form.service';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { QuestionGradeDirective } from '../../../directives/question-grade/question-grade.directive';
@Component({
  selector: 'app-multiple-choice-question',
  imports: [MatCheckboxModule, MatRadioModule, ReactiveFormsModule, QuestionGradeDirective],
  templateUrl: './multiple-choice-question.component.html',
  styleUrl: './multiple-choice-question.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultipleChoiceQuestionComponent {
  private readonly sharedForm = inject(SharedQuizFormService);
  question = input.required<SessionQuestion>();
  protected questionId = computed(() => this.question().id);
  correctAnswers = input<SessionAnswer[] | null>(null);

  form = computed<ReturnType<typeof this.sharedForm.mapControlToQuestion>>(() => this.sharedForm.mapControlToQuestion(this.questionId()));
  protected currentAnswers = computed(() => {
    const form = this.form()?.controls.currentAnswer;
    return form as FormControl<string[]>;
  });

  updateAnswers(event: MatCheckboxChange) {
    const currentAnswers = this.form()?.controls.currentAnswer as FormArray<never>;
    const checked = event.checked;
    const value = event.source.value;

    if (checked) {
      currentAnswers.push(new FormControl(value) as never);
    } else {
      const index = currentAnswers.controls.findIndex((control: FormControl<string>) => control.value === value);
      currentAnswers.removeAt(index);
    }

    currentAnswers.setErrors(currentAnswers.length === 0 ? { required: true } : null);
  }

  protected answerIsCorrect(answerId: string): boolean | null {
    const correctAnswers = this.correctAnswers();

    if (!correctAnswers) {
      return null;
    }

    const answerIds = correctAnswers.map(ca => ca.id);
    return answerIds.includes(answerId);
  }
}
