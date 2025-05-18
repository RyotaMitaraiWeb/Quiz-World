# SingleChoiceAnswersManager
A class that wraps Angular's reactive forms API to facilitate the management of single-choice questions' answers. It is recommended to use the ``AnswersManagersFactory`` service to create instances of this manager due to its stateful nature.

All indices used when interacting with this manager ignore the correct answer control; for example, index 2 refers to the third wrong answer control, irrespective of where the correct answer control is positioned in the form array.

## Methods and getters
```typescript
function addField(value = ''): void
```
Pushes a new wrong answer field to the form array. If the form array already has 10 answers, this method does nothing.

```typescript
function getFieldAt(index: number): FormGroup<{
    value: FormControl<string | null>;
    correct: FormControl<boolean | null>;
}> | null
```
Returns the wrong answer control at the given ``index`` or ``null`` if such cannot be found at the given index.

```typescript
function removeFieldAt(index: number): void
```
Attempts to remove the wrong answer control at the given ``index``. If there is only one wrong answer control, this method does nothing. If there is no wrong answer form control at the given index, throws an error.

```typescript
get wrongAnswers(): FormGroup<{
    value: FormControl<string | null>;
    correct: FormControl<boolean | null>;
}>[]
```
Returns an array of all wrong answer controls.

```typescript
function getErrorsAt(index: number): ValidationErrors | null
```
Returns an object with validation errors for the wrong answer control answer value at the given index. If there are no validation errors, returns ``null``. If there is no wrong answer control at the given index, throws an error.

```typescript
get canRemoveWrongAnswerFields(): boolean
```
Returns a boolean value that indicates whether the user can remove wrong answer control fields. This can be used to conditionally display buttons for removing fields.

```typescript
get canAddWrongAnswerFields(): boolean
```
Returns a boolean value that indicates whether the user can add more wrong answer control fields. This can be used to condtionally display buttons for adding wrong answer fields.

```typescript
get correctAnswer(): FormGroup<{
    value: FormControl<string | null>;
    correct: FormControl<boolean | null>;
}>
```
Returns the correct answer control.