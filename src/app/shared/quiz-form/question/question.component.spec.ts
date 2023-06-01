import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatSelectHarness } from '@angular/material/select/testing';

import { QuestionComponent } from './question.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;
  let loader: HarnessLoader;

  describe('Unit tests', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [QuestionComponent, BrowserAnimationsModule]
      });
      fixture = TestBed.createComponent(QuestionComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Component tests', () => {
    let questionEl: HTMLElement;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [QuestionComponent, BrowserAnimationsModule],
      }).compileComponents();
      fixture = TestBed.createComponent(QuestionComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      questionEl = fixture.debugElement.nativeElement;
      loader = TestbedHarnessEnvironment.loader(fixture);
    });

    it('Generates correct heading based on index', () => {
      component.index = 2;
      fixture.detectChanges();

      const questionIndex = questionEl.querySelector('.question-index');
      console.log(questionIndex);

      expect(questionIndex?.textContent).toBe('Question #2');
    });

    describe('Generating question type', () => {
      it('Successfully generates a question based on @Input type', async () => {
        component.type = 'multi';
        fixture.detectChanges();

        const select = await loader.getHarness(MatSelectHarness);
        const selectValue = await select.getValueText();
        expect(selectValue).toBe('Multiple-choice');

        const questionType = questionEl.querySelector('.question-type');
        expect(questionType?.textContent).toBe('Multiple-choice question');

        component.type = 'single';
        fixture.detectChanges();

        expect(questionType?.textContent).toBe('Single-choice question');
        expect(await select.getValueText()).toBe('Single-choice');
      });

      it('Changes question type via the select menu', async () => {
        const select = await loader.getHarness(MatSelectHarness);
        await select.open();

        const options = await select.getOptions();
        await options[1].click();

        const multi = questionEl.querySelector('.multiple-choice-question');
        expect(multi).not.toBe(null);

        const single = questionEl.querySelector('.single-choice-question');
        expect(single).toBe(null);
      });

      it('Memorizes prompt if type is changed through the select menu', async () => {
        const promptField = questionEl.querySelector('.prompt') as HTMLInputElement;
        promptField.value = 'random';
        promptField.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        const select = await loader.getHarness(MatSelectHarness);
        await select.open();

        const options = await select.getOptions();
        await options[1].click();

        fixture.detectChanges();

        const multipleChoiceQuestion = questionEl.querySelector('.multiple-choice-question');
        expect(multipleChoiceQuestion).not.toBeNull();
      });
    });
  });
});
