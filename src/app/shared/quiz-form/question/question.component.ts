import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { IQuestion, IQuestionSubmission, question } from '../../../../types/components/question.types';
import { SingleChoiceComponent } from './single-choice/single-choice.component';
import { MultipleChoiceComponent } from './multiple-choice/multiple-choice.component';
import { TextComponent } from './text/text.component';

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
export class QuestionComponent {
  @Input() question: IQuestion = {
    prompt: '',
    answers: [],
  };
  @Input() index = 0;
  @Input() type: question = 'single';

  @Output() changeEvent = new EventEmitter<IQuestionSubmission>();

  triggerChange(question: IQuestion) {
    this.question.prompt = question.prompt;
    this.question.answers = question.answers;    

    this.changeEvent.emit({
      ...question,
      order: this.index,
      type: this.type,
    })
  }

  questionLabels: Record<question, IQuestionHint> = {
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
