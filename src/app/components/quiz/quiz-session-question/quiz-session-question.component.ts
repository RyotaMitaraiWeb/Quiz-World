import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { SharedQuizFormService } from '../../../services/shared/quiz-form/shared-quiz-form.service';
import { QuizStore } from '../../../store/quiz/quiz.store';
import { shortQuestionType, shortQuestionTypes } from '../../../common/questionTypes';
import { SingleChoiceQuestionComponent } from '../single-choice-question/single-choice-question.component';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { TextQuestionComponent } from '../text-question/text-question.component';
import { MultipleChoiceQuestionComponent } from '../multiple-choice-question/multiple-choice-question.component';

@Component({
  selector: 'app-quiz-session-question',
  imports: [
    SingleChoiceQuestionComponent,
    TextQuestionComponent,
    MultipleChoiceQuestionComponent,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './quiz-session-question.component.html',
  styleUrl: './quiz-session-question.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizSessionQuestionComponent {
  private readonly sharedForm = inject(SharedQuizFormService);
  private readonly quiz = inject(QuizStore);
  protected questionTypes = shortQuestionTypes;

  question = computed(() => this.quiz.questions().find(q => q.id === this.questionId()));
  questionId = input.required<string>();
  readonly form = computed(() => this.sharedForm.mapControlToQuestion(this.questionId()));
  protected isInstantMode = computed(() => this.quiz.instantMode());

  protected questionInstructions: Record<shortQuestionType, string> = {
    single: 'Select the correct answer',
    multi: 'Select all answers that are correct',
    text: 'Type in your answer (case, caps, and space insensitive)',
  };
}
