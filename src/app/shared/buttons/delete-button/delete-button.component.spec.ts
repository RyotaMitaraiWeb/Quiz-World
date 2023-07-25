import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DeleteButtonComponent } from './delete-button.component';
import { QuizService } from '../../../features/quiz-service/quiz.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpResponse, HttpStatusCode } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('DeleteButtonComponent', () => {
  let component: DeleteButtonComponent;
  let fixture: ComponentFixture<DeleteButtonComponent>;

  let element: HTMLElement;
  let quizService: QuizService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DeleteButtonComponent,
        HttpClientTestingModule,
        RouterTestingModule,
      ]
    });
    fixture = TestBed.createComponent(DeleteButtonComponent);
    component = fixture.componentInstance;

    element = fixture.debugElement.nativeElement;
    quizService = TestBed.inject(QuizService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Unit tests', () => {
    describe('deleteQuiz', () => {
      it('Calls the router with the correct arguments when request is successful', waitForAsync(() => {
        component.id = 1;
        spyOn(quizService, 'deleteQuiz').and.returnValue(
          of(
            new HttpResponse({
              status: HttpStatusCode.NoContent,
              statusText: 'No Content'
            })
          )
        );
    
        spyOn(router, 'navigate').and.stub();

        component.deleteQuiz(1);

        expect(quizService.deleteQuiz).toHaveBeenCalledWith(1);
        expect(router.navigate).toHaveBeenCalledWith(['/']);
      }));

      it('Does not call the router if request is unsuccessful', waitForAsync(() => {
        component.id = 1;
        spyOn(quizService, 'deleteQuiz').and.returnValue(
          new Observable(o => {
            o.error(new HttpResponse({
              status: HttpStatusCode.Forbidden,
              statusText: 'Forbidden'
            }))
          })
        );
    
        spyOn(router, 'navigate').and.stub();

        component.deleteQuiz(1);

        expect(quizService.deleteQuiz).toHaveBeenCalledWith(1);
        expect(router.navigate).not.toHaveBeenCalled();
      }));
    });
  });
});
