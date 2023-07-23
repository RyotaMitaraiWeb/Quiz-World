import { CommonModule } from '@angular/common';
import { Component, Input, OnInit} from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { question } from '../../../../types/components/question.types';
import { SingleChoiceComponent } from './single-choice/single-choice.component';
import { MultipleChoiceComponent } from './multiple-choice/multiple-choice.component';
import { TextComponent } from './text/text.component';
import { FormBuilder, Validators } from '@angular/forms';
import { questionTypes } from '../../../constants/question-types.constants';

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
    correctAnswers: this.fb.array([
      this.fb.group({ answer: ['', [Validators.required, Validators.maxLength(100)]] })
    ]),
    wrongAnswers: this.fb.array([
      this.fb.group({ answer: ['', [Validators.required, Validators.maxLength(100)]] })
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
   * * if the question is changed to a text one, all wrong answers are removed and 
   * the wrong answers control is disabled
   * * if the question is changed to a single-choice one, all correct answers are
   * removed, with the exception of the first one
   * * if the question is changed to any type other than a text one, the wrong answers
   * control will be enabled and, if the question does not currently have a wrong answer,
   * an empty wrong answer will be added to the wrong answers control.
   * @param value the new question type
   */
  onChangeQuestionType(value: question) {
    this.form.controls.type.setValue(value);

    if (value === questionTypes.text) {
      while (this.form.controls.wrongAnswers.length) {
        this.form.controls.wrongAnswers.removeAt(0);
      }
    } else {
      this.form.controls.wrongAnswers.enable();
      if (this.form.controls.wrongAnswers.length === 0) {
        this.form.controls.wrongAnswers.push(this.fb.group({ answer: ['', [Validators.required, Validators.maxLength(100)]] }));
      }
    }

    if (value === questionTypes.single) {
      this.removeAllCorrectAnswersExceptTheFirstOne();
    }
  }

  private removeAllCorrectAnswersExceptTheFirstOne() {
    while (this.form.controls.correctAnswers.length > 1) {
      this.form.controls.correctAnswers.removeAt(1);
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
