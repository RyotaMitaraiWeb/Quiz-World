export type question = 'SingleChoice' | 'MultipleChoice' | 'Text';
export type shortQuestionType = 'single' | 'multi' | 'text';

export const questionTypes: Record<shortQuestionType, question> = {
  single: 'SingleChoice',
  multi: 'MultipleChoice',
  text: 'Text',
};

export const shortQuestionTypes: Record<question, shortQuestionType> = {
  SingleChoice: 'single',
  MultipleChoice: 'multi',
  Text: 'text',
};

