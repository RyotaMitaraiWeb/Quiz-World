import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { IGradedAnswer, ISessionAnswer, ISessionQuestion } from '../../../../../types/responses/quiz.types';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AnswerService } from '../../../answer-service/answer.service';
import { QuestionSessionModule } from './question-session/question-session.module';
import { question, shortQuestionType } from '../../../../../types/components/question.types';
import { MatButtonModule } from '@angular/material/button';
import { Subscription, delay } from 'rxjs';
import { questionTypes, shortQuestionTypes } from '../../../../constants/question-types.constants';

@Component({
  selector: 'app-quiz-session',
  templateUrl: './quiz-session.component.html',
  styleUrls: ['./quiz-session.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    QuestionSessionModule,
    MatButtonModule
  ]
})
export class QuizSessionComponent implements OnInit, OnDestroy {
  constructor(
    private readonly fb: FormBuilder,
    private readonly answerService: AnswerService,
  ) { }

  @Input({ required: true }) questions: ISessionQuestion[] = [];
  @Input({ required: true }) instantMode = false;
  @Input({ required: true }) quizId = 0;

  private addControl(value: any, questionId: string, type: shortQuestionType) {
    const group = this.fb.group({
      currentAnswer: type === shortQuestionTypes[questionTypes.multi] ? value : [value, [Validators.required]],
      id: [questionId],
      type: [type]
    });

    if (type === shortQuestionTypes[questionTypes.multi]) {
      group.setErrors({ required: true });
    }

    return group;
  }

  ngOnInit(): void {
    this.form.removeAt(0);

    this.questions.forEach(q => {
      if (q.type === shortQuestionTypes[questionTypes.text]) {
        this.form.push(this.addControl('', q.id, q.type));
      } else if (q.type === shortQuestionTypes[questionTypes.multi]) {
        this.form.push(this.addControl(
          this.fb.array([]), q.id, q.type
        ));
      } else {
        this.form.push(this.addControl(null, q.id, q.type));
      }

      this.questionKeys.set(q.id, null);
      this.prompts.set(q.id, q.prompt);
    });
  }

  questionKeys = new Map<string, ISessionAnswer[] | null>();
  prompts = new Map<string, string>();

  form: FormArray<FormGroup<
    {
      currentAnswer: FormControl<any>,
      id: FormControl<string | null>,
      type: FormControl<shortQuestionType | null>,
    }
  >> = this.fb.array([
    this.addControl('', '', shortQuestionTypes[questionTypes.single])
  ]);

  protected getQuestionControlAt(index: number) {
    return this.form.controls[index];
  }

  private gradeSub: Subscription = new Subscription();

  /**
   * Creates a subscription which grades all questions. If the
   * quiz is NOT in instant mode and the quiz has not been graded, this
   * method will fetch the correct answers for each question, update the
   * ``questionKeys`` map with each question's correct answers and disable the form.
   * 
   * The ``questionKeys`` map will pass the correct answers to each question, which
   * will update its status via their ``ngOnChanges`` implementation.
   * @param event 
   */
  gradeQuestions(event: Event) {
    event.preventDefault();

    if (!this.instantMode && this.form.enabled) {
      this.gradeSub = this.answerService
        .getCorrectAnswersForAllQuestions(this.quizId)
        .subscribe({
          next: res => {
            const correctAnswers = res.body!;

            for (const ca of correctAnswers) {
              const { questionId, answers } = ca;
              this.questionKeys.set(questionId, answers);
            }

            this.form.disable();
          },
          error: (err) => {
            console.warn(err);
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.gradeSub.unsubscribe();
  }
}
