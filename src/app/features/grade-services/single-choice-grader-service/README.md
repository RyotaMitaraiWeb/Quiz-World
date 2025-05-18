# SingleChoiceGraderService

## Methods
```typescript
function formatCorrectAnswers(correctAnswers: ISessionAnswer[] | null): string[] | null
```
Returns an array containing the correct answers' IDs or ``null`` if ``correctAnswers`` is ``null``.

```typescript
function grade(answers: string, correctAnswers: ISessionAnswer[] | null): boolean | null
```
Returns ``null`` if ``correctAnswers`` is ``null`` or a boolean value indicating whether ``answers`` matches the ID in ``correctAnswers``.

```typescript
function generateGradedAnswerClass(answer: string, correctAnswers: ISessionAnswer[] | null): 'correct-answer' | 'wrong-answer' | 'not-graded'
```
Returns a string value that indicates whether the provided ``answer`` is correct or ungraded.

```typescript
function generatePromptClass(isCorrect: boolean | null): "unanswered" | "correct" | "wrong"
```
Returns a class name that indicates whether the user's answers are correct, wrong, or have to be graded. This method is inherited from ``GradeService``.