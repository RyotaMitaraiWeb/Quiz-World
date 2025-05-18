# MultipleChoiceAnswersManager
A class that wraps Angular's reactive forms API to facilitate the management of multiple-choice questions' answers. It is recommended to use the ``AnswersManagersFactory`` service to create instances of this manager due to its stateful nature.

All indices used when interacting with this manager are treated as if the correct answer controls and wrong answer controls were two separate lists (for example, index 1 would refer to the second correct or wrong answer control).

## Methods and getters
```typescript
function addField(value = '', correct: boolean): void
```
Pushes a new correct or wrong answer control to the form. If there are 10 controls, this method does nothing.

```typescript
function getAnswersOfCorrectness(correct: boolean): FormGroup<{
    value: FormControl<string | null>;
    correct: FormControl<boolean | null>;
}>[]
```
Returns all correct or wrong answer fields based on the provided ``correct`` parameter.

```typescript
function getFieldAtIndex(index: number, correct: boolean): FormGroup<{
    value: FormControl<string | null>;
    correct: FormControl<boolean | null>;
}> | null
```
Returns the correct or wrong answer field at the given index or ``null`` if no control of the given ``correct`` value can be found.

```typescript
function removeFieldAt(index: number, correct: boolean): void
```
Attempts to remove the correct or wrong answer control at the given index. The method does nothing in the following conditions:
* there are only two answers in the form array
* when passing ``true`` to ``correct``, if there is only one correct answer (provided that there are enough wrong answers)

Note that it is possible to remove the only wrong answer, as long as there are at least two correct answers.

If there is no form control for the given ``correct`` value at the given ``index``, this method will throw an error.

```typescript
function getErrorsAt(index: number, correct: boolean): ValidationErrors | null
```
Retrieves validation errors for the ``value`` field of the correct/wrong answer control. If there are no validation errors, returns ``null``. If there is no form control at the given index, throws an error.

```typescript
get canRemoveCorrectAnswersFields(): boolean;
```
Returns a boolean value indicating whether the user can remove a correct answer field. Can be used to conditionally render a button for removing correct answers.

```typescript
get canAddAnswersField(): boolean
```
Returns a boolean value indicating whether the user can add a correct answer field. Can be used to conditionally render a button for adding answers.

```typescript
get canRemoveCorrectAnswersFields(): boolean
```
Returns a boolean value indicating whether the user can remove a wrong answer field. Can be used to conditionally render a button for removing wrong answers.
