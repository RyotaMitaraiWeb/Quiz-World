# app-search
## Usage

```html
<app-search></app-search>
```

Renders a search field which, upon submission, navigates the user to the search page, applying the correct search query string.

## Methods
```typescript
function search(event: Event): void
```
If the ``title`` form control value is not falsy, this method will redirect the user to ``/quiz/search``, attaching the form control value as a ``search`` query string. If the form control value is falsy, this method does nothing.