# AnswersManager
A class that provides a unified API for managing answer fields. You pass the answers control that you want to work with to the constructor. Any changes done through the manager apply to the passed form. In addition, if the form is modified from the outside (e.g. through other APIs), the manager will correctly derive from the new state. This makes the manager ideal if the form is passed in a huge and/or complex chain of components.

## Usage
```typescript
import { FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

// Provide a FormBuilder instance
const fb = new FormBuilder();

// Instantiate the controls that you want to work with
const form = fb.array([fb.group({ answer: ['', [Validators.required, Validators.maxLength(100)]] })]);

const manager = new AnswersManager(form, fb);

// Now if you use the manager to add a field, this will reflect directly onto the passed form
manager.addField(); // the form variable now has two answers.


```

## Methods and getters
```typescript
get form()
```
Returns the form that was passed to the manager.

```typescript
function addField(value = ''): void
```
Pushes a new group of control to the form. This control includes the needed validations. An argument can be passed to pass the control with a specific value.


```typescript
function removeFieldAt(index: number): void
```
Removes the control at the given index from the form. Throws an error if the control has only one answer or if there is no answer at the given index.

```typescript
function getErrorsAt(index: number): ValidationErrors | null
```
Returns an object containing all validation errors for the field at the given index or ``null`` if there are no validation errors. If the field does not exist, throws an error.

```typescript
get hasMoreThanOneAnswer(): boolean
```
Returns a boolean value that indicates whether the form currently has more than one answer.