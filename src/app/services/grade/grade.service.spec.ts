import { TestBed } from '@angular/core/testing';

import { GradeService } from './grade.service';
import { SessionAnswer } from '../quiz/types';

const singleChoiceAnswer: SessionAnswer = {
  id: '1',
  value: 'yes'
};

const textAnswers: SessionAnswer[] = [
  {
    id: '1',
    value: 'yes',
  },
  {
    id: '2',
    value: ' nOrm al    ',
  },
  {
    id: '3',
    value: 'correct',
  }
];

function generateMultipleCorrectAnswers(correctAnswersCount: number) {
  const answers: SessionAnswer[] = [];
  for (let i = 1; i <= correctAnswersCount; i++) {
    answers.push({ id: i.toString(), value: 'some answer'});
  }

  return answers;
}

describe('GradeService', () => {
  let service: GradeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GradeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('gradeSingleChoiceQuestion', () => {
    it('Returns true if the provided answers match up', () => {
      const result = service.gradeSingleChoiceQuestion('1', [singleChoiceAnswer]);
      expect(result).toBeTrue();
    });

    it('Returns false if the answers do not match up', () => {
      const result = service.gradeSingleChoiceQuestion('2', [singleChoiceAnswer]);
      expect(result).toBeFalse();
    });

    it('Returns null if the question has not been graded yet', () => {
      const result = service.gradeSingleChoiceQuestion('1', null);
      expect(result).toBeNull();
    });
  });

  describe('gradeMultipleChoiceQuestion', () => {
    it('Returns true if the provided answers match up (regardless of order)', () => {
      const result1 = service.gradeMultipleChoiceQuestion(['3', '2', '1'], generateMultipleCorrectAnswers(3));
      expect(result1).toBeTrue();
    });

    it('Returns false if the answers do not match up', () => {
      const wrongDueToLengthDifference = service.gradeMultipleChoiceQuestion(['1', '2', '3', '3'], generateMultipleCorrectAnswers(3));
      const wrongDueToPresenceOfAWrongAnswer = service.gradeMultipleChoiceQuestion(['1', '2', '3', '4'], generateMultipleCorrectAnswers(3));
      const wrongDueToMissingACorrectAnswer = service.gradeMultipleChoiceQuestion(['1', '2'], generateMultipleCorrectAnswers(3));

      expect(wrongDueToLengthDifference).toBeFalse();
      expect(wrongDueToPresenceOfAWrongAnswer).toBeFalse();
      expect(wrongDueToMissingACorrectAnswer).toBeFalse();
    });

    it('Returns null if the question has not been graded yet', () => {
      const result = service.gradeMultipleChoiceQuestion(['1'], null);
      expect(result).toBeNull();
    });
  });

  describe('gradeTextQuestion', () => {
    it('Returns true if the provided answers match up (ignores casing, whitespace, and caps letter)', () => {
      const result = service.gradeTextQuestion('  NOrma L      ', textAnswers);
      expect(result).toBeTrue();
    });

    it('Returns false if the answers do not match up', () => {
      const result = service.gradeTextQuestion('wrong', textAnswers);
      expect(result).toBeFalse();
    });

    it('Returns null if the question has not been graded yet', () => {
      const result = service.gradeTextQuestion('1', null);
      expect(result).toBeNull();
    });
  });
});
