import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizFormBasicDataComponent } from './quiz-form-basic-data.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
