import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleChoiceQuestionFormComponent } from './single-choice-question-form.component';
import { emptySingleChoiceQuestion } from '../../emptyForms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { quizValidationRules } from '../../../../common/validationRules/quiz-form';
import { FormArray, FormGroup } from '@angular/forms';
import { AnswerField } from '../../types';

describe('SingleChoiceQuestionFormComponent', () => {
  let component: SingleChoiceQuestionFormComponent;
  let fixture: ComponentFixture<SingleChoiceQuestionFormComponent>;
  let nativeElement: HTMLElement;
  let question: ReturnType<typeof emptySingleChoiceQuestion>;
  let answersForm: FormArray<FormGroup<AnswerField>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleChoiceQuestionFormComponent, NoopAnimationsModule],
    })
    .compileComponents();

    question = emptySingleChoiceQuestion();
    answersForm = question.controls.answers;
    fixture = TestBed.createComponent(SingleChoiceQuestionFormComponent);
    nativeElement = fixture.nativeElement;
    component = fixture.componentInstance;
    fixture.componentRef.setInput('form', answersForm);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Adds a new wrong answer when button is clicked', async () => {
    const fields = nativeElement.querySelectorAll('.answer-field');
    expect(fields.length).toBe(2);

    const button = nativeElement.querySelector('.add-wrong-answer-button');
    button?.dispatchEvent(new MouseEvent('click'));

    await fixture.whenStable();
    fixture.detectChanges();
    const fields2 = nativeElement.querySelectorAll('.answer-field');
    expect(fields2.length).toBe(3);

    expect(nativeElement.querySelectorAll('.answer-field.wrong').length).toBe(2);
  });

  it('Does not display the add wrong answer button if the answers count limit is hit', async () => {
    const button = nativeElement.querySelector('.add-wrong-answer-button');
    const max = quizValidationRules.questions.answers.singleChoice.maxlength;
    for (let i = answersForm.length; i <= max; i++) {
      button!.dispatchEvent(new MouseEvent('click'));
      await fixture.whenStable();
    }

    fixture.detectChanges();
    expect(nativeElement.querySelector('.add-wrong-answer-button')).toBeNull();
  });

  it('remove answer button works correctly', async () => {
    const add = nativeElement.querySelector('.add-wrong-answer-button');
    expect(nativeElement.querySelector('.remove-wrong-answer-button')).toBeNull();

    add?.dispatchEvent(new MouseEvent('click'));
    add?.dispatchEvent(new MouseEvent('click'));
    await fixture.whenStable();
    fixture.detectChanges();

    const removeButton1 = document.querySelectorAll('.remove-wrong-answer-button')[1];
    const answerId = answersForm.controls[2].controls.randomId.value;

    removeButton1.dispatchEvent(new MouseEvent('click'));
    await fixture.whenStable();
    fixture.detectChanges();

    expect(answersForm.length).toBe(3);

    const removedAnswer = answersForm.controls.find(c => c.controls.randomId.value === answerId);
    expect(removedAnswer).toBeUndefined();

    const removeButton2 = document.querySelectorAll('.remove-wrong-answer-button')[1];
    removeButton2.dispatchEvent(new MouseEvent('click'));
    await fixture.whenStable();
    fixture.detectChanges();

    expect(nativeElement.querySelector('.remove-wrong-answer-button')).toBeNull();
  });
});
