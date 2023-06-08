# QuizService
An injectable service for managing quizzes (retrieving/creating/editing/deleting).

## Methods

```typescript
function create(quiz: IQuizFormSubmission): Observable<HttpResponse<ICreatedQuizResponse>>
```
Sends a POST request to ``/quiz/create`` and attaches ``quiz`` to the body. The result observes the response and returns it as a JSON.

```typescript
function getById(id: number): Observable<HttpResponse<IQuizDetails>>
```
Sends a GET request to ``/quiz/{id}`` where ``{id}`` is the passed argument. The result observes the response and returns it as a JSON.