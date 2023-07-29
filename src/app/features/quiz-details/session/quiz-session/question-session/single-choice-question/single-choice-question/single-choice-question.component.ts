import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IQuestionComponent, question, shortQuestionType } from '../../../../../../../../types/components/question.types';
import { ISessionAnswer } from '../../../../../../../../types/responses/quiz.types';
import { MatRadioModule } from '@angular/material/radio';
import { questionTypes, shortQuestionTypes } from '../../../../../../../constants/question-types.constants';
import { MatCardModule } from '@angular/material/card';

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
  styleUrls: ['./single-choice-question.component.scss']
})
export class SingleChoiceQuestionComponent implements IQuestionComponent<number>, OnChanges {
  constructor(
    private readonly fb: FormBuilder
  ) { }

  @Input({ required: true }) prompt: string = '';
  @Input({ required: true }) correctAnswers: ISessionAnswer[] | null = null;
  @Input({ required: true }) answers: ISessionAnswer[] = [{
    id: '',
    value: '',
  }];

  protected radioName = Date.now().toString();
  
  /**
   * Returns the ID of the correct answer or ``null`` if ``correctAnswers`` is ``null``
   * (aka the question has not been graded)
  */
  get correctAnswer(): string | null {
    if (this.correctAnswers === null) {
      return null;
    }

    return this.correctAnswers[0].id;
  }

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
    if (this.isCorrect === null) {
      return 'unanswered';
    }

    return this.isCorrect ? 'correct' : 'wrong';
  }

  /**
   * Returns a boolean value that indicates whether the user has answered correctly
   * or ``null`` if the user has not yet answered.
   * 
   * A user is considered to have answered correctly if they have chosen the correct
   * radio button (aka the answer's ``id`` matches the correct answer's ``id``).
   */
  get isCorrect(): boolean | null {
    if (this.correctAnswer === null) {
      return null;
    }

    
    return this.correctAnswer === this.currentAnswer;
  }

  private answerIsCorrect(id: string): boolean | null {
    if (this.correctAnswer === null) {
      return null;
    }

    return this.correctAnswer === id;
  }

  /**
   * Returns a class name that indicates whether a given answer is correct, wrong,
   * or ungraded.
   * @param id the ID of the answer
   * @returns a string representing the answer's status.
   */
  answerClass(id: string): "not-graded" | "correct-answer" | "wrong-answer" {
    const result = this.answerIsCorrect(id);
    if (result === null) {
      return 'not-graded';
    }

    return result ? 'correct-answer' : 'wrong-answer';
  }

  private get currentAnswer(): string {
    return this.form.controls.currentAnswer.value || '';
  }
}
