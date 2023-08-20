import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DeleteButtonComponent } from './delete-button.component';
import { QuizService } from '../../../features/quiz-service/quiz.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpResponse, HttpStatusCode } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarService } from '../../../core/snackbar/snackbar.service';

describe('DeleteButtonComponent', () => {
  let component: DeleteButtonComponent;
  let fixture: ComponentFixture<DeleteButtonComponent>;

  let element: HTMLElement;
  let quizService: QuizService;
  let router: Router;
  let snackbar: SnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DeleteButtonComponent,
        HttpClientTestingModule,
        RouterTestingModule,
        NoopAnimationsModule,
        MatSnackBarModule,
      ]
    });
    fixture = TestBed.createComponent(DeleteButtonComponent);
    component = fixture.componentInstance;

    element = fixture.debugElement.nativeElement;
    quizService = TestBed.inject(QuizService);
    router = TestBed.inject(Router);
    snackbar = TestBed.inject(SnackbarService);
    spyOn(snackbar, 'open').and.stub();
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
