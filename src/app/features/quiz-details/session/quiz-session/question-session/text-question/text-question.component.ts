import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IQuestionComponent, question, shortQuestionType } from '../../../../../../../types/components/question.types';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ISessionAnswer } from '../../../../../../../types/responses/quiz.types';
import { MatCardModule } from '@angular/material/card';
import { shortQuestionTypes } from '../../../../../../constants/question-types.constants';
import { TextGraderService } from '../../../../../grade-services/text-grader-service/text-grader.service';
import { GradeService } from '../../../../../grade-services/grade.service';

@Component({
  selector: 'app-text-question',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
  ],
  templateUrl: './text-question.component.html',
  styleUrls: ['./text-question.component.scss'],
  providers: [
    {
      provide: GradeService,
      useClass: TextGraderService,
    }
  ]
})
export class TextQuestionComponent implements OnChanges {
  constructor(
    private readonly fb: FormBuilder,
    private readonly grader: GradeService<string, string>,
    ) { }

  @Input({ required: true }) correctAnswers: ISessionAnswer[] | null = null;
  @Input({ required: true }) prompt: string = '';

  protected get formattedCorrectAnswers(): string[] | null {
    return this.correctAnswers?.map(ca => ca.value) || null;
  }

  @Input({ required: true }) form: FormGroup<
    {
      currentAnswer: FormControl<string | null>;
      id: FormControl<string | null>;
      type: FormControl<shortQuestionType | null>;
    }
  > = this.fb.group({
    currentAnswer: ['', Validators.required],
    id: [''],
    type: [shortQuestionTypes.Text]
  });

  /**
   * Returns ``null`` if ``correctAnswers`` is ``null`` (which means that the question
   * has not been graded yet) or a boolean value that indicates whether the user has
   * answered correctly or not. The user has answered correctly if they have
   * typed a correct answer. The grading is case insensitive (canada === CANADA === cANadA)
   */
  protected get isCorrect(): boolean | null {
    return this.grader.grade(this.currentAnswer, this.correctAnswers);
  }

  private get currentAnswer(): string {
    return this.form.controls.currentAnswer.value || '';
  }

  protected get promptClass(): "unanswered" | "correct" | "wrong" {
    return this.grader.generatePromptClass(this.isCorrect);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.correctAnswers = changes['correctAnswers'].currentValue;
  }

  protected get gradedAnswerClass() {
    return this.grader.generateGradedAnswerClass(this.currentAnswer, this.correctAnswers);
  }
}
