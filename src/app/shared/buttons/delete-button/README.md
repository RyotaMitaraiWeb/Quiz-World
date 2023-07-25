# app-delete-button

## Usage
```html
<app-delete-button [id]="1">insert some text here</app-delete-button>
```

### @Input properties
* ``id`` - a number representing the quiz's ID (**Required**)

Renders a button which, upon click, will send a DELETE request to delete the quiz.

**Note:** This component does not have any encapsulation, proceed with caution when styling within this component.

## Methods
```typescript
function deleteQuiz(id: number): void
```
Sends a DELETE request to ``/quiz/{id}``. If the request is successful, the user is redirected to the home page.