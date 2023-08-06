# GradeService
An abstract service for grading questions.

## Type parameters
- ``TAnswer`` - the data type of a singular answer. For example, each answer of a multiple-choice question is represented by a string ID.
- ``TAnswerSubmission`` - the data type of an answer submission. For example, multiple-choice questions are submitted as an array of string IDs, while a text question is submitted as a singular string value.

## Methods
```typescript
abstract formatCorrectAnswers(correctAnswers: ISessionAnswer[] | null): TAnswer[] | null;
```
Should return an array of ``TAnswer`` values or ``null`` if the question has not been graded yet. Implementation is left to the class that inherits this service.

```typescript
abstract grade(answers: TAnswerSubmission, correctAnswers: ISessionAnswer[] | null): boolean | null;
```
Should return a boolean value that indicates whether the question has been answered correctly or ``null`` if the question has not been graded. Implementation is left to the class that inherits this service.

```typescript
abstract generateGradedAnswerClass(answer: TAnswer, correctAnswers: ISessionAnswer[] | null): "correct-answer" | "wrong-answer" | "not-graded";
```
Should return a class name that indicates whether a particular answer is correct, wrong, or yet to be graded. Implementation is left to the class that inherits this service.

```typescript
function generatePromptClass(isCorrect: boolean | null): "unanswered" | "correct" | "wrong"
```
Returns a class name that indicates whether the user's answers are correct, wrong, or have to be graded.
