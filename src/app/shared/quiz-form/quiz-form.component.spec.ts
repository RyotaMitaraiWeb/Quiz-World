import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuizFormComponent } from './quiz-form.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder, Validators } from '@angular/forms';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';
import { MatSelectHarness } from '@angular/material/select/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { questionTypes } from '../../constants/question-types.constants';
import { validationRules } from 'src/app/constants/validationRules.constants';

describe('QuizFormComponent', () => {
  let component: QuizFormComponent;
  let fixture: ComponentFixture<QuizFormComponent>;
  let loader: HarnessLoader;

  const event = new Event('click');
  const fb = new FormBuilder();
  let form = fb.group({
    title: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.maxLength(300)]],
    questions: fb.array(
      [
        fb.group(
          {
            prompt: ['', [Validators.required, Validators.maxLength(100)]],
            answers: fb.array(
              [
                fb.group({
                  value: ['', [Validators.required, Validators.maxLength(100)]],
                  correct: [true],
                }),
                fb.group({
                  value: ['', [Validators.required, Validators.maxLength(100)]],
                  correct: [false],
                })
              ]
            ),
            type: [questionTypes.single],
            notes: ['', [Validators.maxLength(validationRules.quiz.question.notes.maxLength)]],
          }
        )]
    ),
    instantMode: [false],
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
        title: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
        description: ['', [Validators.required, Validators.maxLength(300)]],
        questions: fb.array(
          [
            fb.group(
              {
                prompt: ['', [Validators.required, Validators.maxLength(100)]],
                answers: fb.array(
                  [
                    fb.group({
                      value: ['', [Validators.required, Validators.maxLength(100)]],
                      correct: [true],
                    }),
                    fb.group({
                      value: ['', [Validators.required, Validators.maxLength(100)]],
                      correct: [false],
                    })
                  ]
                ),
                type: [questionTypes.single],
                notes: ['', [Validators.maxLength(validationRules.quiz.question.notes.maxLength)]],
              }
            )]
        ),
        instantMode: [false],
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
            type: questionTypes.single,
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
            ],
            notes: '',
          },
          {
            prompt: 'question2',
            type: questionTypes.multi,
            order: 2,
            notes: '',
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
        expect(q1.controls.type.value).toBe(questionTypes.single);

        expect(q1.controls.answers.length).toBe(2);
        expect(q1.controls.answers.controls[0].controls.value.value).toBe('a');
        expect(q1.controls.answers.controls[0].controls.correct.value).toBeTrue();

        expect(q1.controls.answers.controls[1].controls.value.value).toBe('b');
        expect(q1.controls.answers.controls[1].controls.correct.value).toBeFalse();

        expect(q2.controls.answers.length).toBe(5);
      });

      it('populates form correctly if no questions are passed', () => {
        component.ngOnInit();
        const questions = component.form.controls.questions;
        expect(questions.length).toBe(1);

        const q1 = questions.controls[0];

        expect(q1.controls.prompt.value).toBe('');
        expect(q1.controls.type.value).toBe(questionTypes.single);

        expect(q1.controls.answers.length).toBe(2);

        expect(q1.controls.answers.controls[0].controls.value.value).toBe('');
        expect(q1.controls.answers.controls[0].controls.correct.value).toBeTrue();

        expect(q1.controls.answers.controls[1].controls.value.value).toBe('');
        expect(q1.controls.answers.controls[1].controls.correct.value).toBeFalse();
      });

      it('Disables the instant mode field if edit is set to true', () => {
        component.edit = true;
        component.ngOnInit();
        expect(component.form.controls.instantMode.disabled).toBeTrue();
      })
    });

    describe('addQuestion', () => {
      it('Adds a question successfully', () => {
        component.addQuestion(event);
        expect(component.form.controls.questions.length).toBe(2);

        const question = component.form.controls.questions.controls[1].controls;
        expect(question.type.value).toBe(questionTypes.single);
        expect(question.prompt.value).toBe('');
        expect(question.answers.length).toBe(2);
      });

      it('Does not add a question if there are 100 questions', () => {
        for (let i = 1; i <= 99; i++) {
          component.addQuestion(event);
        }

        component.addQuestion(event);
        expect(component.form.controls.questions.length).toBe(100);
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
              answers: fb.array(
                [
                  fb.group({
                    value: ['', [Validators.required, Validators.maxLength(100)]],
                    correct: [true],
                  }),
                  fb.group({
                    value: ['', [Validators.required, Validators.maxLength(100)]],
                    correct: [false],
                  })
                ]
              ),
              type: [questionTypes.single],
              notes: ['', [Validators.maxLength(validationRules.quiz.question.notes.maxLength)]],
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
      loader = TestbedHarnessEnvironment.loader(fixture);
    });

    describe('Initial render', () => {
      it('Renders the form correctly based on @Input() props', async () => {
        component.title = 'some title';
        component.description = 'some description';
        component.questions = [
          {
            prompt: 'question1',
            type: questionTypes.single,
            order: 1,
            notes: '',
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
            type: questionTypes.multi,
            order: 2,
            notes: '',
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

        const titleField = formEl.querySelector('#title') as HTMLInputElement;
        expect(titleField.value).toBe('some title');

        const descriptionField = formEl.querySelector('#description') as HTMLTextAreaElement;
        expect(descriptionField.value).toBe('some description');
      });

      it('Renders the form correctly if no props are passed', async () => {
        component.ngOnInit();
        fixture.detectChanges();

        const questions = formEl.querySelectorAll('.question.wrapper');
        expect(questions.length).toBe(1);

        const titleField = formEl.querySelector('#title') as HTMLInputElement;
        expect(titleField.value).toBe('');

        const descriptionField = formEl.querySelector('#description') as HTMLTextAreaElement;
        expect(descriptionField.value).toBe('');

        const checkbox = await loader.getHarness(MatCheckboxHarness);
        const checked = await checkbox.isChecked();
        expect(checked).toBeFalse();
      });

      it('Does not render the instant mode field if edit is set to true', () => {
        component.edit = true;
        component.ngOnInit();
        fixture.detectChanges();

        const field = formEl.querySelector('.instant-mode-field');
        expect(field).toBeNull();
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

      it('Does not render add question button if there are 100 questions', () => {
        component.ngOnInit();
        fixture.detectChanges();

        const btn = formEl.querySelector('.add-question-btn') as HTMLButtonElement;

        for (let i = 1; i <= 99; i++) {
          btn.click();
        }

        fixture.detectChanges();

        const unmountedButton = formEl.querySelector('.add-question-btn');
        expect(unmountedButton).toBeNull();
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

      it('Does not show the remove button if there is only one question', () => {
        component.ngOnInit();
        fixture.detectChanges();        

        const btn = formEl.querySelector('.remove-question-btn');
        expect(btn).toBeNull();
      });
    });

    describe('Title field', () => {
      it('Displays validation error for required', () => {
        component.ngOnInit();
        fixture.detectChanges();

        component.form.controls.title.markAsTouched();
        fixture.detectChanges();

        const matErrors = formEl.querySelectorAll('mat-error');
        expect(matErrors.length).toBe(1);
        expect(matErrors[0].textContent).toBe('Please fill this field!');
      });

      it('Displays validation error for minlength', () => {
        component.ngOnInit();
        fixture.detectChanges();

        component.form.controls.title.setValue('a');
        fixture.detectChanges();

        component.form.controls.title.markAsTouched();
        fixture.detectChanges();

        const matErrors = formEl.querySelectorAll('mat-error');
        expect(matErrors.length).toBe(1);
        expect(matErrors[0].textContent).toBe('Title is too short!');
      });
    });

    describe('Description field', () => {
      it('Displays validation error for required', async () => {
        component.ngOnInit();
        fixture.detectChanges();

        component.form.controls.description.markAsTouched();
        fixture.detectChanges();

        const matErrors = formEl.querySelectorAll('mat-error');
        expect(matErrors.length).toBe(1);
        expect(matErrors[0].textContent).toBe('Please fill this field!');
      });
    });

    describe('Submit button', () => {
      it('is enabled if there are no validation errors', () => {
        component.ngOnInit();
        fixture.detectChanges();
        component.form.controls.description.setValue('a');

        component.form.controls.title.setValue('1234567890112');
        component.form.controls.questions.controls[0].controls.prompt.setValue('a');
        component.form.controls
          .questions.controls[0].controls.answers.controls[0]
          .controls.value.setValue('a');

        component.form.controls
          .questions.controls[0].controls.answers.controls[1]
          .controls.value.setValue('a');
        fixture.detectChanges();

        component.form.markAllAsTouched();
        fixture.detectChanges();

        const submit = formEl.querySelector('#submit') as HTMLButtonElement;
        expect(submit.disabled).toBeFalse();
      });

      it('is disabled if there are validation errors in the title', () => {
        component.ngOnInit();
        fixture.detectChanges();

        component.form.controls.title.setValue('a');

        component.form.controls.description.setValue('a');
        component.form.controls
          .questions.controls[0].controls.answers.controls[0]
          .controls.value.setValue('a');

        component.form.controls
          .questions.controls[0].controls.answers.controls[1]
          .controls.value.setValue('a');
        fixture.detectChanges();

        component.form.markAllAsTouched();
        fixture.detectChanges();

        const submit = formEl.querySelector('#submit') as HTMLButtonElement;
        expect(submit.disabled).toBeTrue();
      });

      it('is disabled if there are validation errors in the description', () => {
        component.ngOnInit();
        fixture.detectChanges();
        component.form.controls.description.setValue('');

        component.form.controls.title.setValue('1234567890112');
        component.form.controls
          .questions.controls[0].controls.answers.controls[0]
          .controls.value.setValue('a');

        component.form.controls
          .questions.controls[0].controls.answers.controls[1]
          .controls.value.setValue('a');
        fixture.detectChanges();

        component.form.markAllAsTouched();
        fixture.detectChanges();

        const submit = formEl.querySelector('#submit') as HTMLButtonElement;
        expect(submit.disabled).toBeTrue();
      });

      it('is disabled if there are validation errors in one of the questions', () => {
        component.ngOnInit();
        fixture.detectChanges();

        component.form.controls.title.setValue('1234567890112');

        component.form.controls.description.setValue('a');
        component.form.controls.questions.controls[0].controls.prompt.setValue('a');
        component.form.controls
          .questions.controls[0].controls.answers.controls[0]
          .controls.value.setValue('');

        component.form.controls
          .questions.controls[0].controls.answers.controls[1]
          .controls.value.setValue('a');
        fixture.detectChanges();

        component.form.markAllAsTouched();
        fixture.detectChanges();

        const submit = formEl.querySelector('#submit') as HTMLButtonElement;
        expect(submit.disabled).toBeTrue();
      });

      it('updates disabled status when a new question is added', () => {
        component.ngOnInit();
        fixture.detectChanges();
        component.form.controls.description.setValue('a');

        component.form.controls.title.setValue('1234567890112');
        component.form.controls.questions.controls[0].controls.prompt.setValue('a');
        component.form.controls
          .questions.controls[0].controls.answers.controls[0]
          .controls.value.setValue('a');

        component.form.controls
          .questions.controls[0].controls.answers.controls[1]
          .controls.value.setValue('a');
        fixture.detectChanges();

        component.form.markAllAsTouched();
        fixture.detectChanges();

        const submit = formEl.querySelector('#submit') as HTMLButtonElement;
        expect(submit.disabled).toBeFalse();

        const addBtn = formEl.querySelector('.add-question-btn') as HTMLButtonElement;
        addBtn.click();
        fixture.detectChanges();

        expect((formEl.querySelector('#submit') as HTMLButtonElement).disabled).toBeTrue();
      });

      it('updates disabled status when a new answer is added', () => {
        component.ngOnInit();
        fixture.detectChanges();
        component.form.controls.description.setValue('a');

        component.form.controls.title.setValue('1234567890112');
        component.form.controls.questions.controls[0].controls.prompt.setValue('a');
        component.form.controls
          .questions.controls[0].controls.answers.controls[0]
          .controls.value.setValue('a');



        component.form.controls
          .questions.controls[0].controls.answers.controls[1]
          .controls.value.setValue('a');
        fixture.detectChanges();

        component.form.markAllAsTouched();
        fixture.detectChanges();
        const submit = formEl.querySelector('#submit') as HTMLButtonElement;
        expect(submit.disabled).toBeFalse();

        const addBtn = formEl.querySelector('.add-field-btn') as HTMLButtonElement;
        addBtn.click();
        fixture.detectChanges();

        expect((formEl.querySelector('#submit') as HTMLButtonElement).disabled).toBeTrue();
      });

      it('updates disabled status when question type change renders the form invalid', async () => {
        component.ngOnInit();
        fixture.detectChanges();
        component.form.controls.description.setValue('a');

        component.form.controls.questions.controls[0].controls.prompt.setValue('a');
        component.form.controls.title.setValue('1234567890112');
        component.form.controls
          .questions.controls[0].controls.answers.controls[0]
          .controls.value.setValue('a');

        component.form.controls
          .questions.controls[0].controls.answers.controls[1]
          .controls.value.setValue('a');
        fixture.detectChanges();

        component.form.markAllAsTouched();
        fixture.detectChanges();

        const submit = formEl.querySelector('#submit') as HTMLButtonElement;
        expect(submit.disabled).toBeFalse();

        const select = await loader.getHarness(MatSelectHarness);
        await select.open();
        fixture.detectChanges();

        const options = await select.getOptions();
        await options[2].click();
        fixture.detectChanges();

        await options[0].click();
        fixture.detectChanges();

        expect((formEl.querySelector('#submit') as HTMLButtonElement).disabled).toBeTrue();
      });
    });
  });
});
