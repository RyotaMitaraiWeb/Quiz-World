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

```typescript
function getAllQuizzes(): Observable<IQuizListItem[]>;
function getAllQuizzes(page: number | string): Observable<IQuizListItem[]>;
function getAllQuizzes(page: number | string, sort: sort): Observable<IQuizListItem[]>;
function getAllQuizzes(page: number | string, sort: sort, order: order): Observable<IQuizListItem[]>
function getAllQuizzes(page?: number | string, sort?: sort, order?: order): Observable<IQuizListItem[]>

```
Sends a GET request to ``/quiz/all`` and retrieves a paginated and sorted list of quizzes. You can pass arguments to control the pagination and sorting. The default options are page 1, sorted by title in an ascending order.