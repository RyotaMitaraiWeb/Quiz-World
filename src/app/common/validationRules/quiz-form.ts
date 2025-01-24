export const quizValidationRules = {
  title: {
    minlength: 10,
    maxlength: 200,
  },
  description: {
    minlength: 10,
    maxlength: 200,
  },
  questions: {
    minlength: 1,
    maxlength: 100,
    prompt: {
      maxlength: 200,
    },
    answers: {
      maxlength: 200,
      singleChoice: {
        minlength: 2,
        maxlength: 10,
      },
      multipleChoice: {
        minlength: 2,
        maxlength: 10,
        minlengthCorrect: 1,
      },
      text: {
        minlength: 1,
        maxlength: 15,
      },
    },
    notes: {
      maxlength: 500,
    },
  },
};