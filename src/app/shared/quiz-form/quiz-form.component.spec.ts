import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizFormComponent } from './quiz-form.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('QuizFormComponent', () => {
  let component: QuizFormComponent;
  let fixture: ComponentFixture<QuizFormComponent>;

  describe('Unit tests', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [QuizFormComponent, NoopAnimationsModule]
      });
      fixture = TestBed.createComponent(QuizFormComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  // describe('Component tests', () => {
  //   beforeEach(() => {
  //     TestBed.configureTestingModule({
  //       declarations: [QuizFormComponent]
  //     }).compileComponents();
  //     fixture = TestBed.createComponent(QuizFormComponent);
  //     component = fixture.componentInstance;
  //     fixture.detectChanges();
  //   });

    
  // });
});
