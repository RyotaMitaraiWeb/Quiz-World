import { TestBed } from '@angular/core/testing';

import { AnswersManagersFactoryService } from './answers-managers-factory.service';

describe('AnswersManagersFactoryService', () => {
  let service: AnswersManagersFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnswersManagersFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
