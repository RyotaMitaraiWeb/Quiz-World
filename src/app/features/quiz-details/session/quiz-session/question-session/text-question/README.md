# app-text-question

## Usage

```html
<app-text-question [correctAnswers]="[]" prompt="Question prompt" [form]="insert form array here"></app-text-question>
```

### @Input() properties
```typescript
class SingleChoiceQuestionComponent implements IQuestionComponent, OnChanges {
  @Input() correctAnswers: ISessionAnswer[] | null;
  @Input() prompt: string;
  @Input() form: FormGroup<
    {
      currentAnswer: FormControl<number | null>;
      id: FormControl<number | null>;
      type: FormControl<question | null>;
    }
  >;
}
```

* ``correctAnswers`` - an array of all answers that are considered correct for the given question. Pass ``null`` to the property to indicate that the question has not been graded yet (**Required**).
* ``prompt`` - represents the prompt of the question (**Required**)
* ``form`` - represents the part of the overall form that this instance of the component will manipulate. The form is passed from a parent component because this allows the parent components to easily check whether the user has given an answer to this question and thereby enable or disable the grade buttons (**Required**).

**Note:** unlike other question components, this one does not have an ``answers`` property.

Renders a section that represents text question. The user is presented with a text field where they can type their answer. The user has answered correctly if they have typed one of the correct answers (case insensitive).

### Conditional styling/class names
Certain elements in this component have dynamic class names, which allows you to style them based on different circumstances. Those elements and circumstances are:

* Question prompt heading, which has a class name of ``unanswered``, ``correct``, or ``wrong`` depending on the question's status.

