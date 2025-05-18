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
    answers: FormArray<FormGroup<{
        value: FormControl<string | null>;
        correct: FormControl<boolean | null>;
    }>>;
    type: FormControl<question | null>;
  }>;
}
```

* ```form``` represents the question control that will be modified by this component (**Required**)

Renders a mini form for managing a multiple-choice question. Multiple-choice questions are ones where the user is provided with multiple answers (2+), of which at least one is correct.

The passed form is directly modified by the component, thus you can access its updated state from a parent component or further.