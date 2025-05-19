import { question, shortQuestionType } from '../../types/components/question.types';

export const questionTypes = {
  single: 'SingleChoice' as question,
  multi: 'MultipleChoice' as question,
  text: 'Text' as question,
};

// type key = keyof typeof questionTypes;

export const shortQuestionTypes: Record<question, shortQuestionType> = {
  'SingleChoice': 'single',
  'MultipleChoice': 'multi',
  'Text': 'text',
};