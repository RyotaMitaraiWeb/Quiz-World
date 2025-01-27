import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleChoiceQuestionFormComponent } from './multiple-choice-question-form.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormArray, FormGroup } from '@angular/forms';
import { emptyMultipleChoiceQuestion } from '../../emptyForms';
import { AnswerField } from '../../types';
import { quizValidationRules } from '../../../../common/validationRules/quiz-form';

describe('MultipleChoiceQuestionFormComponent', () => {
  let component: MultipleChoiceQuestionFormComponent;
    let fixture: ComponentFixture<MultipleChoiceQuestionFormComponent>;
    let nativeElement: HTMLElement;
    let question: ReturnType<typeof emptyMultipleChoiceQuestion>;
    let answersForm: FormArray<FormGroup<AnswerField>>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [MultipleChoiceQuestionFormComponent, NoopAnimationsModule],
      })
      .compileComponents();

      question = emptyMultipleChoiceQuestion();
      answersForm = question.controls.answers;
      fixture = TestBed.createComponent(MultipleChoiceQuestionFormComponent);
      nativeElement = fixture.nativeElement;
      component = fixture.componentInstance;
      fixture.componentRef.setInput('form', answersForm);
      fixture.detectChanges();
    });

  async function clickAddCorrectAnswerButton() {
    const correctBtn = nativeElement.querySelector('.add-answer-button.correct');
    correctBtn!.dispatchEvent(new MouseEvent('click'));
    await fixture.whenStable();
    fixture.detectChanges();
  }

  async function clickAddWrongAnswerButton() {
    const incorrectBtn = nativeElement.querySelector('.add-answer-button.wrong');
    incorrectBtn!.dispatchEvent(new MouseEvent('click'));
    await fixture.whenStable();
    fixture.detectChanges();
  }

  const removeWrongAnswerButtons = () => fixture.nativeElement.querySelectorAll('.remove-wrong-answer-button:not(.invisible)') as NodeListOf<HTMLElement>;
  const removeCorrectAnswerButtons = () => fixture.nativeElement.querySelectorAll('.remove-correct-answer-button:not(.invisible)') as NodeListOf<HTMLElement>;

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Add answers buttons successfully add answers', async () => {
    await clickAddCorrectAnswerButton();

    const inputs = nativeElement.querySelectorAll('.answer-field');
    expect(inputs.length).toBe(3);

    expect(nativeElement.querySelectorAll('.answer-field.correct').length).toBe(2);

    await clickAddWrongAnswerButton();

    expect(nativeElement.querySelectorAll('.answer-field.wrong').length).toBe(2);

    for (let i = 4; i < quizValidationRules.questions.answers.multipleChoice.maxlength; i++) {
      await clickAddCorrectAnswerButton();
    }

    expect(nativeElement.querySelector('.add-answer-button.correct')).toBeNull();
    expect(nativeElement.querySelector('.add-answer-button.wrong')).toBeNull();
  });

  it('Remove answers buttons work and show/hide when appropriate', async () => {
    expect(removeWrongAnswerButtons().length).toBe(0);
    expect(removeCorrectAnswerButtons().length).toBe(0);

    await clickAddCorrectAnswerButton();
    expect(removeCorrectAnswerButtons().length).toBe(2);

    const id = answersForm.controls[0].controls.randomId.value;

    const removeBtn = removeCorrectAnswerButtons()[0];
    removeBtn.click();

    await fixture.whenStable();
    fixture.detectChanges();

    expect(nativeElement.querySelectorAll('.answer-field.correct').length).toBe(1);
    expect(removeWrongAnswerButtons().length).toBe(0);
    expect(removeCorrectAnswerButtons().length).toBe(0);
    expect(answersForm.controls.find(c => c.controls.randomId.value === id)).toBeUndefined();

    await clickAddWrongAnswerButton();
    expect(removeWrongAnswerButtons().length).toBe(2);
    expect(removeCorrectAnswerButtons().length).toBe(0);

    await clickAddCorrectAnswerButton();

    for (const btn of removeWrongAnswerButtons()) {
      btn.click();
      await fixture.whenStable();
      fixture.detectChanges();
    }

    expect(nativeElement.querySelectorAll('.answer-field.correct').length).toBe(2);
    expect(nativeElement.querySelectorAll('.answer-field.wrong').length).toBe(0);

    await clickAddCorrectAnswerButton();
    expect(removeWrongAnswerButtons().length).toBe(0);
    expect(removeCorrectAnswerButtons().length).toBe(3);

  });
});
