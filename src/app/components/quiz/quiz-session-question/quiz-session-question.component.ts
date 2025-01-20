import { ChangeDetectionStrategy, Component, computed, inject, input, signal, OnDestroy } from '@angular/core';
import { SharedQuizFormService } from '../../../services/shared/quiz-form/shared-quiz-form.service';
import { QuizStore } from '../../../store/quiz/quiz.store';
import { shortQuestionType, shortQuestionTypes } from '../../../common/questionTypes';
import { SingleChoiceQuestionComponent } from '../single-choice-question/single-choice-question.component';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { TextQuestionComponent } from '../text-question/text-question.component';
import { MultipleChoiceQuestionComponent } from '../multiple-choice-question/multiple-choice-question.component';
import { Subscription } from 'rxjs';
import { GradeService } from '../../../services/grade/grade.service';
import { AnswerService } from '../../../services/answer/answer.service';
import { SessionAnswer } from '../../../services/quiz/types';
import { QuestionType } from '../../../services/grade/types';
import { QuestionGradeDirective } from '../../../directives/question-grade/question-grade.directive';

@Component({
  selector: 'app-quiz-session-question',
  imports: [
    SingleChoiceQuestionComponent,
    TextQuestionComponent,
    MultipleChoiceQuestionComponent,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    QuestionGradeDirective,
  ],
  templateUrl: './quiz-session-question.component.html',
  styleUrl: './quiz-session-question.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizSessionQuestionComponent implements OnDestroy {
  private readonly sharedForm = inject(SharedQuizFormService);
  private readonly quiz = inject(QuizStore);
  private readonly gradeService = inject(GradeService);
  private readonly answerService = inject(AnswerService);

  protected questionTypes = shortQuestionTypes;

  question = computed(() => this.quiz.questions().find(q => q.id === this.questionId()));
  questionId = input.required<string>();

  private version = computed(() => this.quiz.version());
  private questionType = computed(() => this.question()?.type);
  readonly form = computed(() => this.sharedForm.mapControlToQuestion(this.questionId()));
  protected isInstantMode = computed(() => this.quiz.instantMode());

  readonly correctAnswers = signal<SessionAnswer[] | null>(null);
  readonly userHasAnsweredCorrectly = computed<boolean | null>(() => {
    const userAnswers = this.form()?.controls.currentAnswer.value;
    const correctAnswers = this.correctAnswers();
    const questionType = this.questionType();

    if (!userAnswers || !questionType) {
      return null;
    }

    return this.gradeService.grade(userAnswers, correctAnswers, this.questionTypeMap[questionType]);
  });

  gradeQuestion(event: MouseEvent) {
    event.preventDefault();

    this.gradeSub = this.answerService
      .getCorrectAnswersForQuestionById(this.questionId(), this.version())
      .subscribe({
        next: (grade) => {
          this.correctAnswers.set(grade.answers);
          this.form()?.disable();
        },
        error: () => {
          //
        },
      });
  }

  protected questionInstructions: Record<shortQuestionType, string> = {
    single: 'Select the correct answer',
    multi: 'Select all answers that are correct',
    text: 'Type in your answer (case, caps, and space insensitive)',
  };

  private questionTypeMap: Record<shortQuestionType, QuestionType> = {
    single: QuestionType.SingleChoice,
    multi: QuestionType.MultipleChoice,
    text: QuestionType.Text,
  };

  private gradeSub?: Subscription;

  ngOnDestroy() {
    this.gradeSub?.unsubscribe();
  }
}
