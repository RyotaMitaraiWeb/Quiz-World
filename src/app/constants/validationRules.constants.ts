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
  }
}