import { CommonModule } from '@angular/common';
import { Component, Input, OnInit} from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { question } from '../../../../types/components/question.types';
import { SingleChoiceComponent } from './single-choice/single-choice.component';
import { MultipleChoiceComponent } from './multiple-choice/multiple-choice.component';
import { TextComponent } from './text/text.component';
import { FormBuilder, Validators } from '@angular/forms';

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
    type: ['single']
  });

  private _type: question = this.form.controls.type.value as question;

  protected get type() {
    return this._type;
  }

  protected set type(value: question) {
    this._type = value;
  }

  onChangeQuestionType(value: question) {
    this.form.controls.type.setValue(value);

    if (value === 'text') {
      while (this.form.controls.wrongAnswers.length) {
        this.form.controls.wrongAnswers.removeAt(0);
      }
    } else {
      this.form.controls.wrongAnswers.enable();
      if (this.form.controls.wrongAnswers.length === 0) {
        this.form.controls.wrongAnswers.push(this.fb.group({ answer: ['', [Validators.required, Validators.maxLength(100)]] }));
      }
    }

    if (value === 'single') {
      this.removeAllCorrectAnswersExceptTheFirstOne();
    }
  }

  private removeAllCorrectAnswersExceptTheFirstOne() {
    while (this.form.controls.correctAnswers.length > 1) {
      this.form.controls.correctAnswers.removeAt(1);
    }
  }

  protected questionLabels: Record<question, IQuestionHint> = {
    single: {
      label: 'Single-choice question',
      tooltip: 'Single-choice questions are ones where there are multiple answers present, with only one of them being correct',
    },
    multi: {
      label: 'Multiple-choice question',
      tooltip: 'Multiple-choice questions are ones where there are multiple answers presents and AT LEAST one of them is correct. More than one correct answer is also possible',
    },
    text: {
      label: 'Text question',
      tooltip: 'Text questions are ones where the respondent must type their answer in a text field. There can be multiple correct answers'
    }
  }
}

interface IQuestionHint {
  label: string;
  tooltip: string;
}
