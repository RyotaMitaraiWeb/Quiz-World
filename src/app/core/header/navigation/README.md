# app-navigation

## Usage

```html
<app-navigation></app-navigation>
```

Renders a ``nav`` with the following content:
- links to Register and Login if the user is not logged in. These links have a class ``guest``.
- links to Create a quiz and Logout if the user is logged in. These links have a class ``user``.

The nav is not rendered at all if the viewport width is <= 500px.

## Methods and getters

### ``isGuest`` (getter)
Returns ``true`` if the user's roles array in the user state is empty, ``false`` otherwise.

### ``getInnerWidth``
```typescript
function getInnerWidth(): number
```
Returns the viewport width when called. This is used in place of CSS media queries for easier testing.