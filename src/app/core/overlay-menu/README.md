# app-overlay-menu

## Usage
```html
<app-overlay-menu></app-overlay-menu>
```

Renders a menu consisting of two halves: the first one being a navigation area and the second one being a dark and transparent overlay. The menu is visible only when the ``open`` ngrx state is ``true``.

The menu blocks interaction with the app and allows interaction only with the menu itself. Clicking the overlay area (but not the links area) will close the menu.

## Methods
```typescript
function closeMenu(): void
```
Sets the ``open`` state to ``false``. The menu is closed in an interval of 500 milliseconds (half a second). This method is invoked when clicking the overlay area; when the user navigates to a different page, the menu is closed abruptly (this will be worked on in the future).
