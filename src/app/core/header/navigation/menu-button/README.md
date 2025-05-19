# app-menu-button

## Usage
```html
<app-menu-button></app-menu-button>
```

Renders a button which, upon click, toggles the menu state (which displays the overlay menu when ``true``). The button is disabled when the overlay menu is visible.

## Methods
```typescript
function toggle(event: Event): void;
```
Dispatches the ``openMenu`` or ``closeMenu`` action based on whether the ``open`` property is ``true`` or ``false``.