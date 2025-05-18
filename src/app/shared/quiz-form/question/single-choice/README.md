# app-single-choice

## Usage
```html
<app-single-choice [form]="insert form object here"></app-single-choice>
```

### @Input() properties
```typescript
class SingleChoiceComponent {
  @Input() form: FormGroup<{
    prompt: FormControl<string | null>;
    correctAnswers: FormArray<FormGroup<{
        answer: FormControl<string | null>;
    }>>;
    wrongAnswers: FormArray<...>;
    type: FormControl<string | null>;
  }>;
}
```

* ```form``` represents the question control that will be modified by this component (**Required**)

Renders a mini form for managing a single-choice question. Single-choice questions are ones where the user is provided with multiple answers (2+), of which only one is correct.

The passed form is directly modified by the component, thus you can access its updated state from a parent component or further.

**Note:** the correct answer's ``name`` property is determined by calling ``Date.now()``. This is done to ensure that it is the only one to be checked (which is used as a visual indicator as to which answer is the correct one).

## Methods
```typescript
function addNewWrongAnswerField(event: Event): void
```
Encapsulates the form's ``AnswerManager``'s ``addField`` method in order to prevent a refresh upon clicking the add field button.

```typescript
function removeNewWrongAnswerFieldAt(event: Event, index: number): void
```
Encapsulates the form's ``AnswerManager``'s ``removeFieldAt`` method in order to prevent a refresh upon clicking the remove field button.