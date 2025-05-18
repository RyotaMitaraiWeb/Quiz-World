# app-create-quiz
## Usage
```html
<app-create-quiz (submitEvent)="myFunc()"></app-create-quiz>
```

Renders an empty quiz form which can be used to create a quiz. When the submit button is clicked, it will emit a ``submitEvent``, passing the form's data as an argument.

## Methods
```typescript
function createQuiz(quiz: IQuizFormSubmission): void
```
Sends a POST request to ``/quiz``, passing the provided ``quiz`` as a request body. If successful, the user will be redirected to the quiz's page.