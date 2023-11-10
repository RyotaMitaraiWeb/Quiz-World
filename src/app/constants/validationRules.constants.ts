export const validationRules = {
  quiz: {
    title: {
      minlength: 10,
      maxlength: 200,
    },
    description: {
      maxlength: 500,
    },
    question: {
      prompt: {
        maxlength: 200,
      },
      notes: {
        maxLength: 500,
      },
      single: {
        minimumAmount: 2,
        minimumAmountOfWrongAnswers: 1,
        maximumAmount: 10,
      },
      multiple: {
        minimumAmount: 2,
        minimumAmountOfCorrectAnswers: 1,
        maximumAmount: 10,
      },
      text: {
        minimumAmount: 1,
        maximumAmount: 15,
      },
      answers: {
        value: {
          maxlength: 200,
        }
      }
    }
  },
  register: {
    username: {
      minlength: 5,
      maxlength: 15,
      pattern: /^[a-z0-9]+$/i,
    },
    password: {
      minlength: 6,
    }
  }
}