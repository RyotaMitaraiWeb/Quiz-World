# app-catalogue

## Usage
```html
<app-catalogue [catalogue]="catalogue"></app-catalogue>
```

### @Input() properties
* ``catalogue`` - an object of type ``IQuizList``. The component will use the data inside it to render the quizzes and the correct page. (**Required**).

### @Output() properties
* ``updateQuizzesEvent`` - this event is emitted every time the user changes the page or selects a new sorting category / order. The event passes an object containing the requested page, sort category, and order.

Renders an ``app-catalogue-select-menu``, a list of ``app-quiz-list-item`` elements that reflect the ``catalogue``'s ``quizzes`` property, and an ``app-catalogue-paginator``. Upon load, the component will set the page and menu to the appropriate options based on the URL's query strings, if there are such. If the catalogue's ``quizzes`` are empty, a special message will be displayed.

## Methods
```typescript
function getQueryParameters(): Observable<Params>;
```
Returns the query parameters from the activated route.

```typescript
function changeSortAndOrder(value: string): void
```
``value`` in this case is passed in the format ``{category}-{order}``. This method will take the respective values and update the ``sort`` and ``order`` properties accordingly. This method will navigate to the same URL, updating any changed query parameters (which on its own emits ``updateQuizzesEvent``).

```typescript
function changePage(page: number): void
```
Updates the ``page`` property to the passed argument and updates the URL's query strings to reflect that. This method will navigate to the same URL, updating any changed query parameters (which on its own emits ``updateQuizzesEvent``).