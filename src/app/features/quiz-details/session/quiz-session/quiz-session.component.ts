import { CommonModule, KeyValue } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, TrackByFunction } from '@angular/core';
import { IGradedAnswer, ISessionAnswer, ISessionQuestion } from '../../../../../types/responses/quiz.types';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AnswerService } from '../../../answer-service/answer.service';
import { QuestionSessionModule } from './question-session/question-session.module';
import { question, shortQuestionType } from '../../../../../types/components/question.types';
import { MatButtonModule } from '@angular/material/button';
import { Subscription, delay } from 'rxjs';
import { questionTypes, shortQuestionTypes } from '../../../../constants/question-types.constants';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-quiz-session',
  templateUrl: './quiz-session.component.html',
  styleUrls: ['./quiz-session.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    QuestionSessionModule,
    MatButtonModule,
  ],
})
export class QuizSessionComponent implements OnInit, OnDestroy {
  constructor(
    private readonly fb: FormBuilder,
    private readonly answerService: AnswerService,
  ) { }

  @Input({ required: true }) questions: ISessionQuestion[] = [];
  @Input({ required: true }) instantMode = false;
  @Input({ required: true }) quizId = 0;
  @Input({ required: true }) version = 0;

  private addControl(value: any, questionId: string, type: shortQuestionType) {
    const group = this.fb.group({
      currentAnswer: type === shortQuestionTypes[questionTypes.multi] ? value : [value, [Validators.required]],
      id: [questionId],
      type: [type],
    });

    if (type === shortQuestionTypes[questionTypes.multi]) {
      group.setErrors({ required: true });
    }

    return group;
  }

  ngOnInit(): void {    
    this.form.removeAt(0);

    this.questions.forEach(q => {
      let form;
      if (q.type === shortQuestionTypes[questionTypes.text]) {
        form = this.addControl('', q.id, q.type);
        // this.form.push(this.addControl('', q.id, q.type));
      } else if (q.type === shortQuestionTypes[questionTypes.multi]) {
        form = this.addControl(
          this.fb.array([]), q.id, q.type
        );
        // form = this.form.push(this.addControl(
        //   this.fb.array([]), q.id, q.type
        // ));
      } else {
        form = this.addControl(null, q.id, q.type);
        // this.form.push(this.addControl(null, q.id, q.type));
      }

      this.form.push(form);
      this.formsKeys.set(q.id, form);
      this.questionKeys.set(q.id, null);

      this.prompts.set(q.id, q.prompt);

      this.questionAnswersKeys.set(q.id, {
        answers: q.answers,
        type: q.type,
      });

      this.questionNotes.set(q.id, q.notes);      
    });    
  }

  questionKeys = new Map<string, ISessionAnswer[] | null>();
  prompts = new Map<string, string>();
  questionAnswersKeys = new Map<string, {
    answers: ISessionAnswer[] | undefined;
    type: shortQuestionType | null,
  }>();
  formsKeys = new Map<string, FormGroup<
  {
    currentAnswer: FormControl<any>,
    id: FormControl<string | null>,
    type: FormControl<shortQuestionType | null>,
  }
>>();

  form: FormArray<FormGroup<
    {
      currentAnswer: FormControl<any>,
      id: FormControl<string | null>,
      type: FormControl<shortQuestionType | null>,
    }
  >> = this.fb.array([
    this.addControl('', '', shortQuestionTypes[questionTypes.single])
  ]);

  questionNotes = new Map<string, string | null>();

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
        .getCorrectAnswersForAllQuestions(this.quizId, this.version)
        .subscribe({
          next: res => {
            const correctAnswers = res.body!;
            const map = new Map<string, ISessionAnswer[]>();

            for (const ca of correctAnswers) {
              const { id: questionId, answers } = ca;
              
              map.set(questionId, answers);              
            }
            
            this.questionKeys = map;
            
            
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

  protected track(_index: number, item: KeyValue<string, string | null>) {
    return item.key;
  }

  protected originalOrder() {
    return 0;
  }
}
