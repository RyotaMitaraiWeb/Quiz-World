# MultipleChoiceGraderService

## Methods
```typescript
function formatCorrectAnswers(correctAnswers: ISessionAnswer[] | null): string[] | null
```
Returns an array containing the answer ID as the only value or ``null`` if ``correctAnswers`` is ``null``.

```typescript
function grade(answers: string[], correctAnswers: ISessionAnswer[] | null): boolean | null
```
Returns ``null`` if the question has not been graded or a boolean value that
indicates whether the question has been answered correctly.

The question is considered correct if the user has checked all correct answers
and has not checked any wrong answers (order does not matter). This method uses
a superset algorithm to compare the user's answer to the correct answers.
This algorithm asymptotically takes O(n) time on average.

**Note:** this method has an early exit for if the correct answers' amount
is different from the user's answers'. If the correct answers looks like
``[1, 2, 3]`` and the user answers look like ``[1, 2, 3, 3]``, this will still
return ``false``.

```typescript
function generateGradedAnswerClass(answer: string, correctAnswers: ISessionAnswer[] | null): 'correct-answer' | 'wrong-answer' | 'not-graded'
```
Returns a string value that indicates whether the provided ``answer`` is correct or ungraded.

```typescript
function generatePromptClass(isCorrect: boolean | null): "unanswered" | "correct" | "wrong"
```
Returns a class name that indicates whether the user's answers are correct, wrong, or have to be graded. This method is inherited from ``GradeService``.