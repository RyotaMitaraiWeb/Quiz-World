import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizFormGuideComponent } from './quiz-form-guide.component';

describe('QuizFormGuideComponent', () => {
  let component: QuizFormGuideComponent;
  let fixture: ComponentFixture<QuizFormGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizFormGuideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizFormGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
