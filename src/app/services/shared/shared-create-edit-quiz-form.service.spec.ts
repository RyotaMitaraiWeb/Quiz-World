import { TestBed } from '@angular/core/testing';

import { SharedCreateEditQuizFormService } from './shared-create-edit-quiz-form.service';

describe('SharedCreateEditQuizFormService', () => {
  let service: SharedCreateEditQuizFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedCreateEditQuizFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
