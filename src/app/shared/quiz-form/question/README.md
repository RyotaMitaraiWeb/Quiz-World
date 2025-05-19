# app-question

## Usage
```html
<app-question></app-question>
```

### @Input() props
```typescript
class QuestionComponent {
  @Input() index: number;
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

* ``index`` - the order in which this question appears, defaults to 0
* ``form`` - the question control associated with the given instance of the class, defaults to a single-choice question with an empty prompt, correct answer, and wrong answer.

This component can dynamically render a mini form for managing a question. Based on the ``form``'s ``type``, the component will render an ``<app-text>``, ``<app-single-choice>``, or ``<app-multiple-choice>`` component. In addition, a dropdown menu is provided, which can be used to change the question's type after render.

### Answer transfer during type switch
When changing the question's type via the dropdown menu, the following happens in regards to whether an answer will be "saved" or not:

* when changing the type to a text question, all wrong answers are deleted.
* when changing the type to a single-choice question, all correct answers bar the first one are deleted.
* when changing the type to any category other than a text question, an empty wrong answer will be added if there are no wrong answer fields.

The prompt field always remains unchanged in any type changes.

### Methods
```typescript
function onChangeQuestionType(value: question): void
```

This function is called every time the user changes the question type from the dropdown menu. This method handles the transfer of answers described above.