import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { QuestionForm } from '../types';
import { question, questionTypes } from '../../../common/questionTypes';
import { emptyAnswer } from '../emptyForms';
import { quizValidationRules } from '../../../common/validationRules/quiz-form';
@Component({
  selector: 'app-question-type-select',
  imports: [MatSelectModule, MatFormFieldModule],
  templateUrl: './question-type-select.component.html',
  styleUrl: './question-type-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionTypeSelectComponent {
  form = input.required<FormGroup<QuestionForm>>();

  changeQuestionType(type: question) {
    const form = this.form();
    const currentType = form.controls.type.value!;

    if (type === questionTypes.text) {
      this.switchToTextQuestion(form);
    } else if (type === questionTypes.single) {
      this.switchToSingleChoiceQuestion(form);
      this.addDefaultWrongAnswer(form);
    } else if (type === questionTypes.multi) {
      this.switchToMultipleChoiceQuestion(form, currentType);
    }
  }

  private switchToTextQuestion(form: FormGroup<QuestionForm>) {
    const answers = form.controls.answers;
    const end = answers.length - 1;

    /*
      Start from the end so that index shifting does not cause
      an answer to be skipped
    */
    for (let i = end; i >= 0; i--) {
      const answer = answers.controls[i];
      if (!answer.controls.correct.value) {
        const id = answer.controls.randomId.value;
        const index = answers.controls.findIndex(a => a.controls.randomId.value === id);
        answers.removeAt(index);
      }
    }

    form.controls.type.setValue(questionTypes.text);
  }

  private switchToSingleChoiceQuestion(form: FormGroup<QuestionForm>) {
    const answers = form.controls.answers;
    const end = answers.controls.findIndex(c => c.controls.correct.value);
    const start = answers.length - 1;

    for (let i = start; i > end; i--) {
      const answer = answers.controls[i];
      if (answer.controls.correct.value) {
        answers.removeAt(i);
      }
    }

    form.controls.type.setValue(questionTypes.single);
  }

  private addDefaultWrongAnswer(form: FormGroup<QuestionForm>) {
    const answers = form.controls.answers;
    const wrongAnswer = answers.controls.find(answer => !answer.controls.correct.value);
    if (!wrongAnswer) {
      answers.push(emptyAnswer(false));
    }
  }

  private switchToMultipleChoiceQuestion(form: FormGroup<QuestionForm>, currentType: question) {
    const answers = form.controls.answers;
    form.controls.type.setValue(questionTypes.multi);

    /*
      Text questions allow more answers than multiple-choice questions.
      Because multiple-choice questions do not mandate wrong answers,
      it is possible to accidentally have more questions than the allowed
      amount when switching from text to multiple-choice, so this
      mandates removing all answers after the limit
    */
    const maxQuestionsCount = quizValidationRules.questions.answers.multipleChoice.maxlength;
    if (currentType === questionTypes.text && answers.length > maxQuestionsCount) {
      for (let i = answers.length - 1; i > maxQuestionsCount - 1; i--) {
        answers.removeAt(i);
      }
    }

    /*
      Like the situation above, text questions can also have fewer
      than the required minimum amount, so add an empty wrong answer
    */
    if (answers.length < quizValidationRules.questions.answers.multipleChoice.minlength) {
      answers.push(emptyAnswer(false));
    }
  }

  protected questionTypes = Object.values(questionTypes);
  protected labels: Record<question, string> = {
    SingleChoice: 'Single-choice',
    MultipleChoice: 'Multiple-choice',
    Text: 'Text',
  };
}
