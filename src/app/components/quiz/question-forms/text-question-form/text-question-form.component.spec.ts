import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextQuestionFormComponent } from './text-question-form.component';
import { emptyTextQuestion } from '../../emptyForms';
import { FormArray, FormGroup } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AnswerField } from '../../types';
import { quizValidationRules } from '../../../../common/validationRules/quiz-form';

describe('TextQuestionFormComponent', () => {
  let component: TextQuestionFormComponent;
  let fixture: ComponentFixture<TextQuestionFormComponent>;
  let nativeElement: HTMLElement;
  let question: ReturnType<typeof emptyTextQuestion>;
  let answersForm: FormArray<FormGroup<AnswerField>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextQuestionFormComponent, NoopAnimationsModule],
    })
    .compileComponents();

    question = emptyTextQuestion();
    answersForm = question.controls.answers;
    fixture = TestBed.createComponent(TextQuestionFormComponent);
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


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Add correct answer button works and hides when necessary', async () => {
    await clickAddCorrectAnswerButton();
    const fields = nativeElement.querySelectorAll('.answer-field');
    expect(fields.length).toBe(2);

    for (let i = 2; i < quizValidationRules.questions.answers.text.maxlength; i++) {
      await clickAddCorrectAnswerButton();
    }

    expect(nativeElement.querySelector('.add-answer-button.correct')).toBeNull();
  });

  it('Remove answer button works and shows/hides when appropriate', async () => {
    const removeCorrectAnswerButtons = () => fixture.nativeElement.querySelectorAll('.remove-correct-answer-button:not(.invisible)') as NodeListOf<HTMLElement>;

    expect(removeCorrectAnswerButtons().length).toBe(0);

    await clickAddCorrectAnswerButton();

    expect(removeCorrectAnswerButtons().length).toBe(2);

    removeCorrectAnswerButtons()[0].click();
    await fixture.whenStable();
    fixture.detectChanges();

    const fields = nativeElement.querySelectorAll('.answer-field');
    expect(fields.length).toBe(1);
  });
});
