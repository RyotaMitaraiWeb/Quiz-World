# app-catalogue

## Usage
```html
<app-catalogue [catalogue]="catalogue"></app-catalogue>
```

### @Input() properties
* ``catalogue`` - an object of type ``IQuizList``. The component will use the data inside it to render the quizzes and the correct page. (**Required**)

### @Output() properties
* ``updateQuizzesEvent`` - this event is emitted every time the user changes the page or selects a new sorting category / order. The event passes an object containing the requested page, sort category, and order.

Renders an ``app-catalogue-select-menu``, a list of ``app-quiz-list-item`` elements that reflect the ``catalogue``'s ``quizzes`` property, and an ``app-catalogue-paginator``. Upon load, the component will set the page and menu to the appropriate options based on the URL's query strings, if there are such. If the catalogue's ``quizzes`` are empty, a special message will be displayed.

## Methods
```typescript
function getQueryString(query: string): string | null
```
Returns the value of the given ``query`` from the URL or ``null`` if the query is missing.

```typescript
function changeSortAndOrder(value: ISort): void
```
Updates the ``sort`` and ``order`` properties to the passed ``value``'s respective properties and updates the URL's query strings to reflect that. In addition, this method will emit, ``updateQuizzesEvent`` passing the current page and the new values as arguments. If there is a search query in the URL, it will be preserved.

```typescript
function changePage(page: number): void
```
Updates the ``page`` property to the passed argument and updates the URL's query strings to reflect that. In addition, this method will emit, ``updateQuizzesEvent`` passing the new page and the current sorting options as arguments. If there is a search query in the URL, it will be preserved.