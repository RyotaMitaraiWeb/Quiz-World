import { TestBed } from '@angular/core/testing';

import { SingleChoiceGraderService } from './single-choice-grader.service';

describe('SingleChoiceGraderService', () => {
  let service: SingleChoiceGraderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SingleChoiceGraderService);
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

      expect(result).toEqual(['1']);
    });
  });

  describe('grade', () => {
    it('Returns null if correct answers are null', () => {
      const result = service.grade('1', null);
      expect(result).toBeNull();
    });

    it('Returns true if the answer ID matches the correct answer', () => {
      const result = service.grade('1', [ { id: '1', value: 'a' }]);
      expect(result).toBeTrue();
    });

    it('Returns false if the answer ID does not match the correct answer', () => {
      const result = service.grade('1', [ { id: '2', value: 'a' }]);
      expect(result).toBeFalse();
    });
  });

  describe('generateGradedAnswerClass', () => {
    it('Returns ungraded if correct answers are null', () => {
      const result = service.generateGradedAnswerClass('1', null);
      expect(result).toBe('not-graded');
    });

    it('Returns "correct-answer" if the answer ID matches the correct answer', () => {
      const result = service.generateGradedAnswerClass('1', [ { id: '1', value: 'a' }]);
      expect(result).toBe('correct-answer');
    });

    it('Returns "wrong-answer" if the answer ID does not match the correct answer', () => {
      const result = service.generateGradedAnswerClass('1', [ { id: '2', value: 'a' }]);
      expect(result).toBe('wrong-answer');
    });
  });
});
