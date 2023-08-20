# Menu state
Tracks whether the overlay menu is open or closed.

## Usage
```typescript
interface IMenuState {
  open: boolean;
}
```

```typescript
const initialState: IMenuState = {
  open: false;
}
```

## Actions
```typescript
closeMenu()
```
Sets ``open`` to ``false``

```typescript
openMenu()
```
Sets ``open`` to ``true``