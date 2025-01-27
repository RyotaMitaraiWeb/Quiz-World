import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SingleChoiceQuestionFormComponent } from '../question-forms/single-choice-question-form/single-choice-question-form.component';
import { QuestionForm } from '../types';
import { MultipleChoiceQuestionFormComponent } from '../question-forms/multiple-choice-question-form/multiple-choice-question-form.component';
import { TextQuestionFormComponent } from '../question-forms/text-question-form/text-question-form.component';
import { MatIconModule } from '@angular/material/icon';
import { quizValidationRules } from '../../../common/validationRules/quiz-form';
import { emptySingleChoiceQuestion } from '../emptyForms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { question } from '../../../common/questionTypes';

@Component({
  selector: 'app-quiz-form-questions',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    ReactiveFormsModule,
    SingleChoiceQuestionFormComponent,
    MultipleChoiceQuestionFormComponent,
    TextQuestionFormComponent,
  ],
  templateUrl: './quiz-form-questions.component.html',
  styleUrl: './quiz-form-questions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizFormQuestionsComponent {
  readonly form = input.required<FormArray<FormGroup<QuestionForm>>>();

  addQuestion(event: MouseEvent) {
    event.preventDefault();
    this.form().push(emptySingleChoiceQuestion());
  }

  deleteQuestion(questionId: string, event: MouseEvent) {
    event.preventDefault();
    const form = this.form();
    const index = form.controls.findIndex(q => q.controls.randomId.value === questionId);

    if (index !== -1) {
      form.removeAt(index);
    }
  }

  protected subtitleLabels: Record<question, string> = {
    SingleChoice: 'Single-choice question',
    MultipleChoice: 'Multiple-choice question',
    Text: 'Text question',
  };


  protected minQuestionsCount = quizValidationRules.questions.minlength;
  protected maxQuestionsCount = quizValidationRules.questions.maxlength;
}
