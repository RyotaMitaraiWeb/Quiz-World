# TextAnswersManager
A class that wraps Angular's reactive forms API to facilitate the management of text questions' answers. It is recommended to use the ``AnswersManagersFactory`` service to create instances of this manager due to its stateful nature.

## Methods and getters
```typescript
function addField(value = ''): void
```
Pushes a new control to the form. If there are already fifteen fields in the form, this method does nothing.

```typescript
function removeFieldAt(index: number): void
```
Attempts to remove the form control at the given index. If there is only one field, this method does nothing. If there is no form control at the given index whatsoever, throws an error.

```typescript
function getErrorsAt(index: number): ValidationErrors | null
```
Returns an object of validation errors for the answer value of the form control at the given index. Returns ``null`` if there are no validation errors. If there is no form control at the given index, throws an error.

```typescript
get canRemoveFields(): boolean
```
Returns a boolean value that indicates whether the user is allowed to remove fields. This can be used to conditionally display buttons for deleting answer fields.

```typescript
get canAddField(): boolean
```
Returns a boolean value that indicates whether the user is allowed to add more fields. This can be used to conditionally display buttons for adding answer fields.

```typescript
get answers(): FormGroup<{
    value: FormControl<string | null>;
    correct: FormControl<boolean | null>;
  }>[]
```
Returns an array of all form controls in the form array.