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
    answers: FormArray<FormGroup<{
        value: FormControl<string | null>;
        correct: FormControl<boolean | null>;
    }>>;
    type: FormControl<question | null>;
  }>
}
```

* ```form``` represents the question control that will be modified by this component (**Required**)

Renders a mini form for managing a text question. Text questions are ones where the user has to input the correct answer in an input field. Text questions have at least one correct answer and do not record specific wrong answers.

The passed form is directly modified by the component, thus you can access its updated state from a parent component or further.