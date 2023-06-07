# app-text

## Usage
```html
<app-text [form]="insert form object here"></app-text>
```

### @Input() properties
```typescript
class TextComponent {
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

Renders a mini form for managing a text question. Text questions are ones where the user has to input the correct answer in an input field. Text questions have at least one correct answer and do not record specific wrong answers.

The passed form is directly modified by the component, thus you can access its updated state from a parent component or further.

**Note:** upon render, the component will disable the passed ``form``'s ``wrongAnswers`` control. This means that this control won't be present when accessing the given question control's ``value`` property.

## Methods
```typescript
function addField(event: Event): void
```
Encapsulates the form's ``AnswerManager``'s ``addField`` method in order to prevent a refresh upon clicking the add field button.

```typescript
function removeField(event: Event, index: number): void
```
Encapsulates the form's ``AnswerManager``'s ``removeFieldAt`` method in order to prevent a refresh upon clicking the remove field button.