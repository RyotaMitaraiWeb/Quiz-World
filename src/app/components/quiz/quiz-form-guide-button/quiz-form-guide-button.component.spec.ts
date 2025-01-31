import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizFormGuideButtonComponent } from './quiz-form-guide-button.component';

describe('QuizFormGuideButtonComponent', () => {
  let component: QuizFormGuideButtonComponent;
  let fixture: ComponentFixture<QuizFormGuideButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizFormGuideButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizFormGuideButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
