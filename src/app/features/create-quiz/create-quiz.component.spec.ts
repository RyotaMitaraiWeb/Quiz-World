import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateQuizComponent } from './create-quiz.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { QuizService } from '../quiz-service/quiz.service';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { QuizFormComponent } from '../../shared/quiz-form/quiz-form.component';
import { Observable, of } from 'rxjs';
import { HttpResponse, HttpStatusCode } from '@angular/common/http';
import { IQuizForm, IQuizFormSubmission } from '../../../types/components/quiz-form.types';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CreateQuizComponent', () => {
  let component: CreateQuizComponent;
  let fixture: ComponentFixture<CreateQuizComponent>;

  let quizService: QuizService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CreateQuizComponent,
        HttpClientTestingModule,
        RouterTestingModule,
        NoopAnimationsModule
      ]
    });
    fixture = TestBed.createComponent(CreateQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    quizService = TestBed.inject(QuizService);
    router = TestBed.inject(Router);
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Unit tests', () => {
    describe('createQuiz', () => {
      it('Calls the router navigate method if request is successful', waitForAsync(() => {
        spyOn(quizService, 'create').and.returnValue(
          of(new HttpResponse({
            status: HttpStatusCode.Created,
            statusText: 'Created',
            body: { id: 1 }
          }))
        );

        spyOn(router, 'navigate').and.stub();

        component.createQuiz({} as IQuizFormSubmission);
        expect(router.navigate).toHaveBeenCalledWith(['/quiz', '1']);
      }));

      it('Does not call the router navigate method if request is unsuccessful', waitForAsync(() => {
        spyOn(quizService, 'create').and.returnValue(
          new Observable(o => o.error(new HttpResponse(
            {
              status: HttpStatusCode.BadRequest,
              statusText: 'Bad Request'
            }
          )))
        );

        spyOn(router, 'navigate').and.stub();

        component.createQuiz({} as IQuizFormSubmission);
        expect(router.navigate).not.toHaveBeenCalled();
      }));
    });
  });
});
