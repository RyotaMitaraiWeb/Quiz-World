import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IGradedAnswer,
  ISessionAnswer,
} from '../../../../../../types/responses/quiz.types';
import {
  question,
  shortQuestionType,
} from '../../../../../../types/components/question.types';
import { TextQuestionComponent } from './text-question/text-question.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { AnswerService } from '../../../../answer-service/answer.service';
import { MatButtonModule } from '@angular/material/button';
import { HttpErrorResponse } from '@angular/common/http';
import { SingleChoiceQuestionComponent } from './single-choice-question/single-choice-question/single-choice-question.component';
import { MultipleChoiceQuestionComponent } from './multiple-choice-question/multiple-choice-question.component';
import {
  shortQuestionTypes,
  questionTypes,
} from '../../../../../constants/question-types.constants';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-question-session',
  standalone: true,
  imports: [
    CommonModule,
    TextQuestionComponent,
    MatButtonModule,
    SingleChoiceQuestionComponent,
    MultipleChoiceQuestionComponent,
    SharedModule,
  ],
  templateUrl: './question-session.component.html',
  styleUrls: ['./question-session.component.scss'],
})
export class QuestionSessionComponent implements OnChanges, OnDestroy {
  protected types = shortQuestionTypes;

  constructor(
    private readonly answerService: AnswerService,
    private readonly fb: FormBuilder
  ) {}

  @Input({ required: true }) version = 0;
  @Input({ required: true }) prompt: string = '';
  @Input({ required: true }) answers: ISessionAnswer[] | undefined = [];
  @Input({ required: true }) correctAnswers: ISessionAnswer[] | null = null;
  @Input({ required: true }) instantMode: boolean = false;
  @Input({ required: true }) type: shortQuestionType | null =
    shortQuestionTypes[questionTypes.single];
  @Input() notes: string | null | undefined = '';
  @Input({ required: true }) form: FormGroup<{
    currentAnswer: any;
    id: FormControl<string | null>;
    type: FormControl<shortQuestionType | null>;
  }> = this.fb.group({
    currentAnswer: ['', Validators.required],
    id: [''],
    type: [shortQuestionTypes[questionTypes.single]],
  });

  ngOnChanges(changes: SimpleChanges) {
    const change = changes['correctAnswers'];

    if (!change.firstChange) {
      this.correctAnswers = change.currentValue;
    }
  }

  private correctAnswersSub: Subscription = new Subscription();
  private get questionId() {
    return this.form.controls.id.value || '';
  }

  /**
   * Creates a subscription which grades the specific question. If the
   * quiz is in instant mode and the question has not been graded, this
   * method will fetch the correct answers for the given question and set
   * the ``correctAnswers`` property to those answers. The form will then
   * be disabled.
   *
   * **Note:** the child components to which the correct answers are passed to
   * should implement the OnChanges interface in order to correctly update their status
   * @param event
   */
  gradeAnswer(event: Event): void {
    event.preventDefault();
    if (this.instantMode && this.form.enabled) {
      this.correctAnswersSub = this.answerService
        .getCorrectAnswersForQuestionById(this.questionId, this.version)
        .subscribe({
          next: (res) => {
            const value = res.body!;
            this.correctAnswers = value.answers;

            this.form.disable();
          },
          error: (err: HttpErrorResponse) => {
            console.warn(err);
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.correctAnswersSub.unsubscribe();
  }
}
