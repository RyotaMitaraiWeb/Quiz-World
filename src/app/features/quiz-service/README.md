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

```typescript
function getQuizzesByTitle(query: string): Observable<IQuizListItem[]>;
function getQuizzesByTitle(query: string, page: number | string): Observable<IQuizListItem[]>;
function getQuizzesByTitle(query: string, page: number | string, sort: sort): Observable<IQuizListItem[]>;
function getQuizzesByTitle(query: string, page: number | string, sort: sort, order: order): Observable<IQuizListItem[]>
function getQuizzesByTitle(query: string, page?: number | string, sort?: sort, order?: order): Observable<IQuizListItem[]>

```
Sends a GET request to ``/quiz/search`` and retrieves a paginated and sorted list of quizzes whose title contains the given ``query``. You can pass arguments to control the pagination and sorting. The default options are page 1, sorted by title in an ascending order.

```typescript
function getUserQuizzes(userId: number): Observable<IQuizListItem[]>;
function getUserQuizzes(userId: number, page: number | string): Observable<IQuizListItem[]>;
function getUserQuizzes(userId: number, page: number | string, sort: sort): Observable<IQuizListItem[]>;
function getUserQuizzes(userId: number, page: number | string, sort: sort, order: order): Observable<IQuizListItem[]>
function getUserQuizzes(userId: number, page?: number | string, sort?: sort, order?: order): Observable<IQuizListItem[]>

```
Sends a GET request to ``/quiz/user/{userId}`` and retrieves a paginated and sorted list of quizzes that were created by the user with the given ID. You can pass arguments to control the pagination and sorting. The default options are page 1, sorted by title in an ascending order.

```typescript
function deleteQuiz(id: number): Observable<HttpResponse<unknown>>
```
Sends a DELETE request to ``/quiz/{id}``. The response status code of a successful request is 204.