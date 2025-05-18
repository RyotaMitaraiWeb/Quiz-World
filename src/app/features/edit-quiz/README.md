# app-edit-quiz
## Usage
```html
<app-edit-quiz (submitEvent)="myFunc()"></app-create-quiz>
```

Renders a quiz form which filled with pre-fetched quiz which can be used to edit said quiz. When the submit button is clicked, it will emit a ``submitEvent``, passing the form's data as an argument. The quiz form will not display the instant mode field and it won't be present when the form emits the form data.

## Methods
```typescript
function editQuiz(quiz: IQuizFormSubmission): void
```
Sends a PUT request to ``/quiz/{id}``, passing the provided ``quiz`` as a request body. If successful, the user will be redirected to the quiz's page.