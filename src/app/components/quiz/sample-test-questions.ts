import { SessionQuestion } from '../../services/quiz/types';

export const singleChoiceQuestionNoteless: SessionQuestion = {
  id: '1',
  prompt: 'Question #1',
  type: 'single',
  notes: null,
  answers: [
    {
      id: '1',
      value: 'correct',
    },
    {
      id: '2',
      value: 'wrong',
    },
  ],
};

export const singleChoiceQuestionWithNotes: SessionQuestion = {
  id: '2',
  prompt: 'Question #2',
  type: 'single',
  notes: 'This is a test single-choice question',
  answers: [
    {
      id: '3',
      value: 'right',
    },
    {
      id: '4',
      value: 'incorrect',
    },
  ],
};

export const textQuestionNoteless: SessionQuestion = {
  id: '3',
  prompt: 'Question #3',
  type: 'text',
  notes: null,
};

export const textQuestionWithNotes: SessionQuestion = {
  id: '4',
  prompt: 'Question #4',
  type: 'text',
  notes: 'This is a test text question',
};

export const multipleChoiceQuestionNoteless: SessionQuestion = {
  id: '5',
  prompt: 'Question #5',
  type: 'multi',
  notes: null,
  answers: [
    {
      id: '5',
      value: 'right1',
    },
    {
      id: '6',
      value: 'right2',
    },
    {
      id: '7',
      value: 'wrong1',
    },
  ],
};

export const multipleChoiceQuestionWithNotes: SessionQuestion = {
  id: '6',
  prompt: 'Question #6',
  type: 'multi',
  notes: 'This is a test multiple-choice question',
  answers: [
    {
      id: '8',
      value: 'correct1',
    },
    {
      id: '9',
      value: 'correct2',
    },
    {
      id: '10',
      value: 'incorrect1',
    },
  ],
};

export const sampleQuestions = [
  singleChoiceQuestionNoteless,
  singleChoiceQuestionWithNotes,
  textQuestionNoteless,
  textQuestionWithNotes,
  multipleChoiceQuestionNoteless,
  multipleChoiceQuestionWithNotes,
];