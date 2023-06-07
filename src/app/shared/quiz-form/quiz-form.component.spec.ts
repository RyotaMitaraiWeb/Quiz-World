import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuizFormComponent } from './quiz-form.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder, Validators } from '@angular/forms';

describe('QuizFormComponent', () => {
  let component: QuizFormComponent;
  let fixture: ComponentFixture<QuizFormComponent>;

  const event = new Event('click');
  const fb = new FormBuilder();
  let form = fb.group({
    title: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', [Validators.maxLength(300)]],
    questions: fb.array(
      [fb.group(
        {
          prompt: ['', [Validators.required, Validators.maxLength(100)]],
          correctAnswers: fb.array([fb.group({ answer: ['', [Validators.required, Validators.maxLength(100)]] })]),
          wrongAnswers: fb.array([fb.group({ answer: ['', [Validators.required, Validators.maxLength(100)]] })]),
          type: ['single'],
        }
      )]
    ),
    instantMode: [false, [Validators.required]],
  });

  describe('Unit tests', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [QuizFormComponent, NoopAnimationsModule]
      });
      fixture = TestBed.createComponent(QuizFormComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      form = fb.group({
        title: ['', [Validators.required, Validators.maxLength(100)]],
        description: ['', [Validators.maxLength(300)]],
        questions: fb.array(
          [fb.group(
            {
              prompt: ['', [Validators.required, Validators.maxLength(100)]],
              correctAnswers: fb.array([fb.group({ answer: ['', [Validators.required, Validators.maxLength(100)]] })]),
              wrongAnswers: fb.array([fb.group({ answer: ['', [Validators.required, Validators.maxLength(100)]] })]),
              type: ['single'],
            }
          )]
        ),
        instantMode: [false, [Validators.required]],
      });
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    describe('ngOnInit', () => {
      it('populates form correctly based on @Input props', () => {
        component.questions = [
          {
            prompt: 'question1',
            type: 'single',
            order: 1,
            answers: [
              {
                value: 'a',
                correct: true,
              },
              {
                value: 'b',
                correct: false,
              }
            ]
          },
          {
            prompt: 'question2',
            type: 'multi',
            order: 2,
            answers: [
              {
                value: 'a',
                correct: true,
              },
              {
                value: 'b',
                correct: false,
              },
              {
                value: 'c',
                correct: true,
              },
              {
                value: 'd',
                correct: false,
              },
              {
                value: 'e',
                correct: false,
              }
            ]
          }
        ];

        component.ngOnInit();
        const questions = component.form.controls.questions;
        expect(questions.length).toBe(2);

        const q1 = questions.controls[0];
        const q2 = questions.controls[1];

        expect(q1.controls.prompt.value).toBe('question1');
        expect(q1.controls.type.value).toBe('single');

        expect(q1.controls.correctAnswers.length).toBe(1);
        expect(q1.controls.correctAnswers.controls[0].controls.answer.value).toBe('a');

        expect(q1.controls.wrongAnswers.length).toBe(1);
        expect(q1.controls.wrongAnswers.controls[0].controls.answer.value).toBe('b');

        expect(q2.controls.correctAnswers.length).toBe(2);
        expect(q2.controls.correctAnswers.controls[0].controls.answer.value).toBe('a');
        expect(q2.controls.correctAnswers.controls[1].controls.answer.value).toBe('c');

        expect(q2.controls.wrongAnswers.length).toBe(3);
        expect(q2.controls.wrongAnswers.controls[0].controls.answer.value).toBe('b');
        expect(q2.controls.wrongAnswers.controls[1].controls.answer.value).toBe('d');
        expect(q2.controls.wrongAnswers.controls[2].controls.answer.value).toBe('e');
      });

      it('populates form correctly if no questions are passed', () => {
        component.ngOnInit();
        const questions = component.form.controls.questions;
        expect(questions.length).toBe(1);

        const q1 = questions.controls[0];

        expect(q1.controls.prompt.value).toBe('');
        expect(q1.controls.type.value).toBe('single');

        expect(q1.controls.correctAnswers.length).toBe(1);
        expect(q1.controls.correctAnswers.controls[0].controls.answer.value).toBe('');

        expect(q1.controls.wrongAnswers.length).toBe(1);
        expect(q1.controls.wrongAnswers.controls[0].controls.answer.value).toBe('');
      });
    });

    describe('addQuestion', () => {
      it('Adds a question successfully', () => {
        component.addQuestion(event);
        expect(component.form.controls.questions.length).toBe(2);

        const question = component.form.controls.questions.controls[1].controls;
        expect(question.type.value).toBe('single');
        expect(question.prompt.value).toBe('');
        expect(question.correctAnswers.length).toBe(1);
        expect(question.wrongAnswers.length).toBe(1);
      });
    });

    describe('removeQuestionAt', () => {
      it('Throws an error if the form has only one question', () => {
        component.form = form;
        expect(() => component.removeQuestionAt(0, event)).toThrowError('You cannot remove the only question remaining!');
      });

      it('Removes a question successfully', () => {
        form.controls.questions.push(
          fb.group(
            {
              prompt: ['question prompt', [Validators.required, Validators.maxLength(100)]],
              correctAnswers: fb.array([fb.group({ answer: ['b', [Validators.required, Validators.maxLength(100)]] })]),
              wrongAnswers: fb.array([fb.group({ answer: ['c', [Validators.required, Validators.maxLength(100)]] })]),
              type: ['single'],
            }
          )
        );

        component.form = form;
        const questions = component.form.controls.questions.controls;
        expect(questions.length).toBe(2);
        component.removeQuestionAt(0, event);
        expect(questions.length).toBe(1);

        expect(questions[0].controls.prompt.value).toBe('question prompt');
      });

      it('Throws an error if the field does not exist', () => {
        expect(() => component.removeQuestionAt(-1, event)).toThrowError('Field does not exist!');
      });
    });
  });

  describe('Component tests', () => {
    let formEl: HTMLElement;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [QuizFormComponent, NoopAnimationsModule]
      }).compileComponents();
      fixture = TestBed.createComponent(QuizFormComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      formEl = fixture.debugElement.nativeElement;
    });

    describe('Initial render', () => {
      it('Renders the correct amount of question elements if props are passed', () => {
        component.questions = [
          {
            prompt: 'question1',
            type: 'single',
            order: 1,
            answers: [
              {
                value: 'a',
                correct: true,
              },
              {
                value: 'b',
                correct: false,
              }
            ]
          },
          {
            prompt: 'question2',
            type: 'multi',
            order: 2,
            answers: [
              {
                value: 'a',
                correct: true,
              },
              {
                value: 'b',
                correct: false,
              },
              {
                value: 'c',
                correct: true,
              },
              {
                value: 'd',
                correct: false,
              },
              {
                value: 'e',
                correct: false,
              }
            ]
          }
        ];
  
        component.ngOnInit();
        fixture.detectChanges();
  
        const questions = formEl.querySelectorAll('.question.wrapper');      
        expect(questions.length).toBe(2);
      });

      it('Renders the correct amount of question elements if no props are passed', () => {
        component.ngOnInit();
        fixture.detectChanges();
  
        const questions = formEl.querySelectorAll('.question.wrapper');
        expect(questions.length).toBe(1);
      });
    });

    describe('Adding fields', () => {
      it('Adds a field after clicking the button successfully', () => {
        component.ngOnInit();
        fixture.detectChanges();

        const btn = formEl.querySelector('.add-question-btn') as HTMLButtonElement;
        btn.click();
        fixture.detectChanges();

        const questions = formEl.querySelectorAll('.question.wrapper');
        expect(questions.length).toBe(2);

        btn.click();
        fixture.detectChanges();

        const questions2 = formEl.querySelectorAll('.question.wrapper');
        expect(questions2.length).toBe(3);
      });
    });

    describe('Removing fields', () => {
      it('Removes a field successfully', () => {
        component.ngOnInit();
        fixture.detectChanges();

        const btn = formEl.querySelector('.add-question-btn') as HTMLButtonElement;
        btn.click();
        fixture.detectChanges();

        btn.click();
        fixture.detectChanges();

        const removeBtn = formEl.querySelector('.remove-question-btn') as HTMLButtonElement;
        removeBtn.click();
        fixture.detectChanges();

        const questions = formEl.querySelectorAll('.question.wrapper');
        expect(questions.length).toBe(2);
      });
    });
  });
});
