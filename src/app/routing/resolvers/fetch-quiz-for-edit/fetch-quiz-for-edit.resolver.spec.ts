import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { fetchQuizForEditResolver } from './fetch-quiz-for-edit.resolver';
import { IEditQuizForm } from '../../../../types/components/quiz-form.types';
import { Observable } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('fetchQuizForEditResolver', () => {
  const executeResolver: ResolveFn<Observable<IEditQuizForm | null>> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => fetchQuizForEditResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
