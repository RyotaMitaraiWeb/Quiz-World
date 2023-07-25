import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditQuizComponent } from './edit-quiz.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { QuizService } from '../quiz-service/quiz.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpResponse, HttpStatusCode } from '@angular/common/http';
import { IEditQuizForm, IQuizFormSubmission } from '../../../types/components/quiz-form.types';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { questionTypes } from '../../constants/question-types.constants';

describe('EditQuizComponent', () => {
  let component: EditQuizComponent;
  let fixture: ComponentFixture<EditQuizComponent>;

  let quizService: QuizService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        EditQuizComponent,
        HttpClientTestingModule,
        RouterTestingModule,
        NoopAnimationsModule
      ]
    });
    fixture = TestBed.createComponent(EditQuizComponent);
    component = fixture.componentInstance;
    spyOn(component, 'getResolvedData').and.returnValue(
      of({
        quiz: {
          id: 1,
          title: 'a',
          description: 'a',
          questions: [
            {
              prompt: 'question #1',
              type: questionTypes.text,
              answers: [{
                value: 'a',
                correct: true,
              }]
            }
          ]
        } as IEditQuizForm
      })
    );
    fixture.detectChanges();

    quizService = TestBed.inject(QuizService);
    router = TestBed.inject(Router);
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Unit tests', () => {
    describe('editQuiz', () => {
      it('Calls the router navigate method if request is successful', waitForAsync(() => {
        spyOn(quizService, 'edit').and.returnValue(
          of(new HttpResponse({
            status: HttpStatusCode.NoContent,
            statusText: 'No content',
            
          }))
        );

        spyOn(router, 'navigate').and.stub();


        component.editQuiz({} as IQuizFormSubmission);
        expect(router.navigate).toHaveBeenCalledWith(['/quiz', '1']);
      }));

      it('Does not call the router navigate method if request is unsuccessful', waitForAsync(() => {
        spyOn(quizService, 'edit').and.returnValue(
          new Observable(o => o.error(new HttpResponse(
            {
              status: HttpStatusCode.BadRequest,
              statusText: 'Bad Request'
            }
          )))
        );

        spyOn(router, 'navigate').and.stub();

        component.editQuiz({} as IQuizFormSubmission);
        expect(router.navigate).not.toHaveBeenCalled();
      }));
    });
  });
});
