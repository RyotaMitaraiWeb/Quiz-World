import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizFormComponent } from './quiz-form.component';

describe('QuizFormComponent', () => {
  let component: QuizFormComponent;
  let fixture: ComponentFixture<QuizFormComponent>;

  describe('Unit tests', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [QuizFormComponent]
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
