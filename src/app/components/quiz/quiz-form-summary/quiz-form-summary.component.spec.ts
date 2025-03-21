import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizFormSummaryComponent } from './quiz-form-summary.component';

describe('QuizFormSummaryComponent', () => {
  let component: QuizFormSummaryComponent;
  let fixture: ComponentFixture<QuizFormSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizFormSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizFormSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
