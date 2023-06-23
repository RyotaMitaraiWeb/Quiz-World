import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IQuestionComponent, question } from '../../../../../../../types/components/question.types';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ISessionAnswer } from '../../../../../../../types/responses/quiz.types';

@Component({
  selector: 'app-text-question',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './text-question.component.html',
  styleUrls: ['./text-question.component.scss']
})
export class TextQuestionComponent implements IQuestionComponent<string>, OnChanges {
  constructor(private readonly fb: FormBuilder) { }

  @Input({ required: true }) correctAnswers: ISessionAnswer[] | null = null;
  @Input({ required: true }) prompt: string = '';

  protected get formattedCorrectAnswers(): string[] | null {
    return this.correctAnswers?.map(ca => ca.value) || null;
  }

  @Input({ required: true }) form: FormGroup<
    {
      currentAnswer: FormControl<string | null>;
      id: FormControl<number | null>;
      type: FormControl<question | null>;
    }
  > = this.fb.group({
    currentAnswer: ['', Validators.required],
    id: [0],
    type: ['text' as question]
  });

  /**
   * Returns ``null`` if ``correctAnswers`` is ``null`` (which means that the question
   * has not been graded yet) or a boolean value that indicates whether the user has
   * answered correctly or not. The user has answered correctly if they have
   * typed a correct answer. The grading is case insensitive (canada === CANADA === cANadA)
   */
  get isCorrect(): boolean | null {
    if (this.formattedCorrectAnswers === null) {
      return null;
    }

    return this.formattedCorrectAnswers.
      findIndex(ca => ca.toLowerCase() === this.currentAnswer.toLowerCase()) !== -1;
  }

  private get currentAnswer(): string {
    return this.form.controls.currentAnswer.value || '';
  }

  protected get promptClass(): "unanswered" | "correct" | "wrong" {
    if (this.isCorrect === null) {
      return 'unanswered';
    }

    return this.isCorrect ? 'correct' : 'wrong';
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.correctAnswers = changes['correctAnswers'].currentValue;
  }
}
