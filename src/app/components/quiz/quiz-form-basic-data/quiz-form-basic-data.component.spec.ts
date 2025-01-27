import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizFormBasicDataComponent } from './quiz-form-basic-data.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { QuizBasicDataForm } from '../types';
import { FormControl, FormGroup } from '@angular/forms';

const form: QuizBasicDataForm = new FormGroup(
  {
    title: new FormControl(''),
    description: new FormControl(''),
    instantMode: new FormControl(false),
  },
);

describe('QuizFormBasicDataComponent', () => {
  let component: QuizFormBasicDataComponent;
  let fixture: ComponentFixture<QuizFormBasicDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizFormBasicDataComponent, NoopAnimationsModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizFormBasicDataComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('form', form);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
