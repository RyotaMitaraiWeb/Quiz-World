# TextGraderService

## Methods
```typescript
function formatCorrectAnswers(correctAnswers: ISessionAnswer[] | null): string[] | null
```
Returns an array containing the correct answers' values or ``null`` if ``correctAnswers`` is ``null``.

```typescript
function grade(answers: string, correctAnswers: ISessionAnswer[] | null): boolean | null
```
Returns ``null`` if ``correctAnswers`` is ``null`` or a boolean value indicating whether ``answers``is contained within ``correctAnswers``. The search is case- and space-insensitive. The answers are also trimmed on both ends.

```typescript
function generateGradedAnswerClass(answer: string, correctAnswers: ISessionAnswer[] | null): 'correct-answer' | 'wrong-answer' | 'not-graded'
```
Returns a string value that indicates whether the provided ``answer`` is correct, wrong, or ungraded.

```typescript
function generatePromptClass(isCorrect: boolean | null): "unanswered" | "correct" | "wrong"
```
Returns a class name that indicates whether the user's answers are correct, wrong, or have to be graded. This method is inherited from ``GradeService``.