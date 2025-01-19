import { TestBed } from '@angular/core/testing';

import { GradeService } from './grade.service';
import { SessionAnswer } from '../quiz/types';
import { QuestionType } from './types';

const singleChoiceAnswer: SessionAnswer = {
  id: '1',
  value: 'yes',
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
  },
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

  describe('grade (single-choice question)', () => {
    it('Returns true if the provided answers match up', () => {
      const result = service.grade('1', [singleChoiceAnswer], QuestionType.SingleChoice);
      expect(result).toBeTrue();
    });

    it('Returns false if the answers do not match up', () => {
      const result = service.grade('2', [singleChoiceAnswer], QuestionType.SingleChoice);
      expect(result).toBeFalse();
    });

    it('Returns null if the question has not been graded yet', () => {
      const result = service.grade('1', null, QuestionType.SingleChoice);
      expect(result).toBeNull();
    });
  });

  describe('grade (multiple-choice)', () => {
    it('Returns true if the provided answers match up (regardless of order)', () => {
      const result1 = service.grade(['3', '2', '1'], generateMultipleCorrectAnswers(3), QuestionType.MultipleChoice);
      expect(result1).toBeTrue();
    });

    it('Returns false if the answers do not match up', () => {
      const wrongDueToLengthDifference = service.grade(['1', '2', '3', '3'], generateMultipleCorrectAnswers(3), QuestionType.MultipleChoice);
      const wrongDueToPresenceOfAWrongAnswer = service.grade(['1', '2', '3', '4'], generateMultipleCorrectAnswers(3), QuestionType.MultipleChoice);
      const wrongDueToMissingACorrectAnswer = service.grade(['1', '2'], generateMultipleCorrectAnswers(3), QuestionType.MultipleChoice);

      expect(wrongDueToLengthDifference).toBeFalse();
      expect(wrongDueToPresenceOfAWrongAnswer).toBeFalse();
      expect(wrongDueToMissingACorrectAnswer).toBeFalse();
    });

    it('Returns null if the question has not been graded yet', () => {
      const result = service.grade(['1'], null, QuestionType.MultipleChoice);
      expect(result).toBeNull();
    });
  });

  describe('grade (text)', () => {
    it('Returns true if the provided answers match up (ignores casing, whitespace, and caps letter)', () => {
      const result = service.grade('  NOrma L      ', textAnswers, QuestionType.Text);
      expect(result).toBeTrue();
    });

    it('Returns false if the answers do not match up', () => {
      const result = service.grade('wrong', textAnswers, QuestionType.Text);
      expect(result).toBeFalse();
    });

    it('Returns null if the question has not been graded yet', () => {
      const result = service.grade('1', null, QuestionType.Text);
      expect(result).toBeNull();
    });
  });
});
