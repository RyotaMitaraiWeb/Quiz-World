import { quizValidationRules } from '../validationRules/quiz-form';

const { title, description, questions } = quizValidationRules;

const { prompt, notes, answers } = questions;

export const quizErrors = {
  title: {
    minlength: `Title must be at least ${title.minlength} characters long`,
    maxlength: `Title must be no longer than ${title.maxlength} characters long`,
  },
  description: {
    minlength: `Description must be at least ${description.minlength} characters long`,
    maxlength: `Description must be no longer than ${description.maxlength} characters long`,
  },
  questions: {
    prompt: {
      maxLength: `Prompt must be no longer than ${prompt.maxlength} characters long`,
    },
    notes: {
      maxlength: `Notes must be no longer than ${notes.maxlength} characters long`,
    },
    answers: {
      maxlength: `Answers must be no longer than ${answers.maxlength} characters long`,
    },
  },
};