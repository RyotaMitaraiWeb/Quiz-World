# app-multiple-choice

## Usage
```html
<app-multiple-choice [form]="insert form object here"></app-multiple-choice>
```

### @Input() properties
```typescript
class MultipleChoiceComponent {
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

Renders a mini form for managing a multiple-choice question. Multiple-choice questions are ones where the user is provided with multiple answers (2+), of which at least one is correct. Each question must have at least one wrong answer.

The passed form is directly modified by the component, thus you can access its updated state from a parent component or further.

## Methods
```typescript
function addNewWrongAnswerField(event: Event): void
```
Encapsulates the form's ``AnswerManager``'s ``addField`` method in order to prevent a refresh upon clicking the add field button.

```typescript
function removeNewWrongAnswerFieldAt(event: Event, index: number): void
```
Encapsulates the form's ``AnswerManager``'s ``removeFieldAt`` method in order to prevent a refresh upon clicking the remove field button.

```typescript
function addNewCorrectAnswerField(event: Event): void
```
Encapsulates the form's ``AnswerManager``'s ``addField`` method in order to prevent a refresh upon clicking the add field button.

```typescript
function removeNewCorrectAnswerFieldAt(event: Event, index: number): void
```
Encapsulates the form's ``AnswerManager``'s ``removeFieldAt`` method in order to prevent a refresh upon clicking the remove field button.