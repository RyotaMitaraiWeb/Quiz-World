import { TestBed } from '@angular/core/testing';

import { GradeService } from './grade.service';

describe('GradeServiceService', () => {
  let service: GradeService<string, string[]>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GradeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('generatePromptClass', () => {
    it('Returns "unanswered" if isCorrect is null', () => {
      expect(service.generatePromptClass(null)).toBe('unanswered');
    });

    it('Returns "wrong" if isCorrect is false', () => {
      expect(service.generatePromptClass(false)).toBe('wrong');
    });

    it('Returns "correct" if isCorrect is true', () => {
      expect(service.generatePromptClass(true)).toBe('correct');
    });
  });
});
