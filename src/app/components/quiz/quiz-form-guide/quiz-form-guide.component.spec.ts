import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizFormGuideComponent } from './quiz-form-guide.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('QuizFormGuideComponent', () => {
  let component: QuizFormGuideComponent;
  let fixture: ComponentFixture<QuizFormGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizFormGuideComponent, NoopAnimationsModule],
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
