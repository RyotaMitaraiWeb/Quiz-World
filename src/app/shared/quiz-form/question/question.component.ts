import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { question } from '../../../../types/components/question.types';
import { SingleChoiceComponent } from './single-choice/single-choice.component';
import { MultipleChoiceComponent } from './multiple-choice/multiple-choice.component';
import { TextComponent } from './text/text.component';
import { FormBuilder, Validators } from '@angular/forms';
import { questionTypes } from '../../../constants/question-types.constants';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SingleChoiceComponent,
    MultipleChoiceComponent,
    TextComponent,
    MatSelectModule,
    MatCardModule,
  ],
})
export class QuestionComponent implements OnInit {
  protected types = questionTypes;

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    this.type = this.form.controls.type.value as question;
  }

  @Input() index = 0;

  @Input() form = this.fb.group({
    prompt: ['', [Validators.required, Validators.maxLength(100)]],
    answers: this.fb.array([
      this.fb.group({
        value: ['', [Validators.required, Validators.maxLength(100)]],
        correct: [true]
      })
    ]),
    type: [questionTypes.single]
  });

  private _type: question = this.form.controls.type.value as question;

  protected get type() {
    return this._type;
  }

  protected set type(value: question) {
    this._type = value;
  }

  /**
   * Handles the transfer of answers when the question type is changed. The following
   * happens with the answers:
   * * if the question is changed to a text one, all wrong answers are removed
   * * if the question is changed to a single-choice one, all correct answers are
   * removed, with the exception of the first one
   * * if the question is changed to any type other than a text one and the question does not currently have a wrong answer,
   * an empty wrong answer will be added to the wrong answers control.
   * @param value the new question type
   */
  onChangeQuestionType(value: question) {
    this.form.controls.type.setValue(value);

    if (value === questionTypes.text) {
      for (let i = 0; i < this.form.controls.answers.length; i++) {
        const form = this.form.controls.answers.controls[i];
        if (!form.controls.correct.value) {
          this.form.controls.answers.removeAt(i);
          i--;
        }
      }
    } else {
      const wrongAnswers = this.form.controls.answers.controls.find(c => !c.value.correct);

      if (!wrongAnswers) {
        this.form.controls.answers.push(this.fb.group(
          {
            value: ['', [Validators.required, Validators.maxLength(100)]],
            correct: [false],
          }
        ));
      }
    }

    if (value === questionTypes.single) {
      this.removeAllCorrectAnswersExceptTheFirstOne();
    }
  }

  private removeAllCorrectAnswersExceptTheFirstOne() {
    let correctAnswerHasBeenFound = true;
    for (let i = 0; i < this.form.controls.answers.length; i++) {
      const form = this.form.controls.answers.controls[i];

      if (form.controls.correct.value) {
        if (correctAnswerHasBeenFound) {
          correctAnswerHasBeenFound = !correctAnswerHasBeenFound;
        } else {
          this.form.controls.answers.removeAt(i);
          i--;
        }
      }
    }
  }

  protected questionLabels: Record<question, IQuestionHint> = {
    'SingleChoice': {
      label: 'Single-choice question',
      tooltip: 'Single-choice questions are ones where there are multiple answers present, with only one of them being correct',
    },
    'MultipleChoice': {
      label: 'Multiple-choice question',
      tooltip: 'Multiple-choice questions are ones where there are multiple answers presents and AT LEAST one of them is correct. More than one correct answer is also possible',
    },
    'Text': {
      label: 'Text question',
      tooltip: 'Text questions are ones where the respondent must type their answer in a text field. There can be multiple correct answers'
    }
  }
}

interface IQuestionHint {
  label: string;
  tooltip: string;
}
