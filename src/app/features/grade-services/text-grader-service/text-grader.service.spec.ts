import { TestBed } from '@angular/core/testing';

import { TextGraderService } from './text-grader.service';

describe('TextGraderService', () => {
  let service: TextGraderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextGraderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('formatCorrectAnswers', () => {
    it('Returns null if passed null', () => {
      const result = service.formatCorrectAnswers(null);
      expect(result).toBeNull();
    });

    it('Returns an array of the correct answer ID', () => {
      const result = service.formatCorrectAnswers([
        {
          id: '1',
          value: 'a',
        },
      ]);

      expect(result).toEqual(['a']);
    });
  });

  describe('grade', () => {
    it('Returns null if correct answers are null', () => {
      const result = service.grade('a', null);
      expect(result).toBeNull();
    });

    it('Returns true if the answer ID matches the correct answer', () => {
      const result = service.grade('   cAn Ad A    ', [ { id: '1', value: 'Canada' }]);
      expect(result).toBeTrue();
    });

    it('Returns false if the answer ID does not match the correct answer', () => {
      const result = service.grade('b', [ { id: '2', value: 'a' }]);
      expect(result).toBeFalse();
    });
  });
});
