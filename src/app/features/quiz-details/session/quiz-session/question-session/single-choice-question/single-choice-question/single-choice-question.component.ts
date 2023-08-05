import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IQuestionComponent, question, shortQuestionType } from '../../../../../../../../types/components/question.types';
import { ISessionAnswer } from '../../../../../../../../types/responses/quiz.types';
import { MatRadioModule } from '@angular/material/radio';
import { questionTypes, shortQuestionTypes } from '../../../../../../../constants/question-types.constants';
import { MatCardModule } from '@angular/material/card';
import { GradeService } from '../../../../../../grade-services/grade.service';
import { SingleChoiceGraderService } from '../../../../../../grade-services/single-choice-grader-service/single-choice-grader.service';

@Component({
  selector: 'app-single-choice-question',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatCardModule,
  ],
  templateUrl: './single-choice-question.component.html',
  styleUrls: ['./single-choice-question.component.scss'],
  providers: [
    {
      provide: GradeService,
      useClass: SingleChoiceGraderService,
    }
  ]
})
export class SingleChoiceQuestionComponent implements OnChanges {
  constructor(
    private readonly fb: FormBuilder,
    private readonly grader: GradeService<string, string>,
  ) { }

  @Input({ required: true }) prompt: string = '';
  @Input({ required: true }) correctAnswers: ISessionAnswer[] | null = null;
  @Input({ required: true }) answers: ISessionAnswer[] = [{
    id: '',
    value: '',
  }];

  protected radioName = Date.now().toString();

  @Input({ required: true }) form: FormGroup<
    {
      currentAnswer: FormControl<string | null>;
      id: FormControl<string | null>;
      type: FormControl<shortQuestionType | null>;
    }
  > = this.fb.group({
    currentAnswer: [null as string | null, [Validators.required]],
    id: [''],
    type: [shortQuestionTypes[questionTypes.single]]
  });

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['correctAnswers'];
    
    if (change) {
      this.correctAnswers = change.currentValue;
    }
  }

  protected get promptClass(): "unanswered" | "correct" | "wrong" {
    return this.grader.generatePromptClass(this.isCorrect);
  }

  /**
   * Returns a boolean value that indicates whether the user has answered correctly
   * or ``null`` if the user has not yet answered.
   * 
   * A user is considered to have answered correctly if they have chosen the correct
   * radio button (aka the answer's ``id`` matches the correct answer's ``id``).
   */
  protected get isCorrect(): boolean | null {
    return this.grader.grade(this.currentAnswer, this.correctAnswers);
  }

  /**
   * Returns a class name that indicates whether a given answer is correct, wrong,
   * or ungraded.
   * @param id the ID of the answer
   * @returns a string representing the answer's status.
   */
  protected answerClass(id: string): "not-graded" | "correct-answer" | "wrong-answer" {
    return this.grader.generateGradedAnswerClass(id, this.correctAnswers);
  }

  private get currentAnswer(): string {
    return this.form.controls.currentAnswer.value || '';
  }

  protected track(_index: number, answer: ISessionAnswer) {
    return answer.id;
  }
}
