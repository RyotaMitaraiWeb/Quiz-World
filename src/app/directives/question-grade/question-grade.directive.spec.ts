import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { QuizDetailsComponent } from '../../pages/quiz-details/quiz-details.component';
import { TestComponent } from './test/test.component';

describe('QuestionGradeDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizDetailsComponent, NoopAnimationsModule],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('gives the correct class name on render', () => {
    const p1 = document.querySelector('.a');
    const p2 = document.querySelector('.b');
    const p3 = document.querySelector('.c');

    expect(p1?.classList.contains('correct')).toBeTrue();
    expect(p2?.classList.contains('incorrect')).toBeTrue();
    expect(p3?.classList.contains('correct')).toBeFalse();
    expect(p3?.classList.contains('icorrect')).toBeFalse();
  });
});
