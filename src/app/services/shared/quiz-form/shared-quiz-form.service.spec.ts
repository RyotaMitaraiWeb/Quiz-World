import { TestBed } from '@angular/core/testing';

import { SharedQuizFormService } from './shared-quiz-form.service';

describe('SharedQuizFormService', () => {
  let service: SharedQuizFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedQuizFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
