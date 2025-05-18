import { TestBed } from '@angular/core/testing';

import { MultipleChoiceGraderService } from './multiple-choice-grader.service';
import { ISessionAnswer } from '../../../../types/responses/quiz.types';

function generateCorrectAnswers(n: number) {
  const answers: ISessionAnswer[] = [];
  for (let i = 1; i <= n; i++) {
    answers.push(
      {
        id: i + '',
        value: 'a',
      }
    );
  }

  return answers;
}

describe('MultipleChoiceGraderService', () => {
  let service: MultipleChoiceGraderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultipleChoiceGraderService);
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
      const result = service.grade(['1'], null);
      expect(result).toBeNull();
    });

    it('Returns true if the answers match the correct answers (irrespective of order)', () => {
      const result1 = service.grade(['1', '2', '3'], generateCorrectAnswers(3));
      expect(result1).toBeTrue();

      const result2 = service.grade(['1', '3', '2'], generateCorrectAnswers(3));
    });

    it('Returns false if the answer ID does not match the correct answer', () => {
      const result1 = service.grade(['1'], generateCorrectAnswers(3));
      expect(result1).toBeFalse();

      const result2 = service.grade(['1', '2', '3', '4'], generateCorrectAnswers(3));
      expect(result2).toBeFalse();

      const result3 = service.grade(['1', '1', '2', '3'], generateCorrectAnswers(3));
      expect(result3).toBeFalse();

      const result4 = service.grade(['1', '3', '4'], generateCorrectAnswers(3));
      expect(result4).toBeFalse();

      const result5 = service.grade(['1', '1', '3'], generateCorrectAnswers(3));
      expect(result5).toBeFalse();
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
