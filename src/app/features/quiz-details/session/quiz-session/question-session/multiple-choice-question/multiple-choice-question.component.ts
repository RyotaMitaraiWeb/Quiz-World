import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { IQuestionComponent, question, shortQuestionType } from '../../../../../../../types/components/question.types';
import { ISessionAnswer } from '../../../../../../../types/responses/quiz.types';
import { MatRadioModule } from '@angular/material/radio';
import { questionTypes, shortQuestionTypes } from '../../../../../../constants/question-types.constants';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-multiple-choice-question',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatCardModule,
  ],
  templateUrl: './multiple-choice-question.component.html',
  styleUrls: ['./multiple-choice-question.component.scss']
})
export class MultipleChoiceQuestionComponent implements IQuestionComponent<number>, OnChanges {
  constructor(private readonly fb: FormBuilder) { }
  @Input({ required: true }) correctAnswers: ISessionAnswer[] | null = [];
  @Input({ required: true }) prompt: string = '';
  @Input({ required: true }) answers: ISessionAnswer[] = [{
    id: '',
    value: '',
  }];
  @Input({ required: true }) form: FormGroup<
    {
      currentAnswer: FormArray<FormControl<string | null>>;
      id: FormControl<string | null>;
      type: FormControl<shortQuestionType | null>;
    }
  > = this.fb.group({
    currentAnswer: this.fb.array([] as FormControl<string | null>[]),
    id: [''],
    type: [shortQuestionTypes[questionTypes.multi]]
  });

  protected checkboxName = Date.now().toString();

  protected get formattedCorrectAnswers() {
    if (this.correctAnswers === null) {      
      return null;
    }

    return this.correctAnswers.map(ca => ca.id);
  }

  /**
   * Returns ``null`` if the question has not been graded or a boolean value that
   * indicates whether the question has been answered correctly.
   * 
   * The question is considered correct if the user has checked all correct answers
   * and has not checked any wrong answers (order does not matter). This getter uses
   * a superset algorithm to compare the user's answer to the correct answers.
   * This algorithm asymptotically takes O(n) time on average.
   * 
   * **Note:** this getter has an early exit for if the correct answers' amount
   * is different from the user's answers'. If the correct answers looks like
   * ``[1, 2, 3]`` and the user answers look like ``[1, 2, 3, 3]``, this will still
   * return ``false``.
   */
  get isCorrect(): boolean | null {    
    if (this.formattedCorrectAnswers === null) {
      return null;
    }

    if (this.formattedCorrectAnswers.length !== this.currentAnswers?.length) {
      return false;
    }

    const superSet: Record<string, number> = {};
    
    for (const answer of this.formattedCorrectAnswers) {
      superSet[answer] = 1;
    }

    for (const answer of this.currentAnswers) {
      if (!answer) {
        throw new Error('Empty string discovered')
      }

      if (!superSet[answer]) {
        return false;
      }

      superSet[answer] = 2;
    }

    for (const answer in superSet) {
      const index = Number(answer);
      if (superSet[index] === 1) {
        return false;
      } 
    }

    return true;
  }

  ngOnChanges(changes: SimpleChanges) {
    const change = changes['correctAnswers'];
    
    if (change) {
      this.correctAnswers = change.currentValue;      
    }
  }

  protected get promptClass() {
    if (this.isCorrect === null) {
      return 'unanswered';
    }

    return this.isCorrect ? 'correct' : 'wrong';
  }

  private answerIsCorrect(id: string) {
    if (this.formattedCorrectAnswers === null) {
      return null;
    }    

    return this.formattedCorrectAnswers.includes(id);
  }

  /**
   * Returns a class name that indicates whether a given answer is correct, wrong,
   * or ungraded.
   * @param id the ID of the answer
   * @returns a string representing the answer's status.
   */
  answerClass(id: string) {
    const result = this.answerIsCorrect(id);
    if (result === null) {
      return 'not-graded';
    }

    return result ? 'correct-answer' : 'wrong-answer';
  }

  /**
   * Mutates the ``currentAnswers`` form array. When the user checks the checkbox,
   * the answer's ID is added to the array. When unchecking it, the ID is removed.
   * This method will also set an error to the form if the only checked checkbox
   * is unchecked.
   * 
   * To get an array of all answer IDs that have been checked, use the ``currentAnswers``
   * getter of the class.
   * @param event the check event from the ``<mat-checkbox>`` that was interacted with.
   * @throws if ``event.source.value`` cannot be found within the form.
   */
  updateAnswers(event: MatCheckboxChange): void {    
    const value = event.source.value;
    const checked = event.checked;

    if (checked) {      
      this.form.controls.currentAnswer.push(this.fb.control(value));
      this.form.controls.currentAnswer.setErrors(null);
    } else {
      const index = this.form.controls.currentAnswer.controls.findIndex(ca => ca.value === value);

      if (index === -1) {
        throw new Error('The checkbox was unchecked, but its value could not be found within the form')
      }

      this.form.controls.currentAnswer.removeAt(index);
      if (this.currentAnswers?.length === 0) {
        this.form.controls.currentAnswer.setErrors({ required: true });
      }
    }    
  }

  /**
   * Retrieves the IDs of all answers that have been checked.
   */
  get currentAnswers(): (string | null)[] | null {    
    return this.form.controls.currentAnswer.value;
  }

  protected track(_index: number, answer: ISessionAnswer) {
    return answer.id;
  }
}
