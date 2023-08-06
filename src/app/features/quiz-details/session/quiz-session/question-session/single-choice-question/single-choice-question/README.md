# app-single-choice-question

## Usage

```html
<app-single-choice-question [correctAnswers]="[]" prompt="Question prompt" [answers]="[]" [form]="insert form array here"></app-single-choice-question>
```

### @Input() properties
```typescript
class SingleChoiceQuestionComponent implements IQuestionComponent, OnChanges {
  @Input() correctAnswers: ISessionAnswer[] | null;
  @Input() prompt: string;
  @Input() answers: ISessionAnswer[];
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
* ``answers`` - represents all answers that the user can potentially check when the question is rendered (**Required**).
* ``form`` - represents the part of the overall form that this instance of the component will manipulate. The form is passed from a parent component because this allows the parent components to easily check whether the user has given an answer to this question and thereby enable or disable the grade buttons (**Required**).


Renders a section that represents a single-choice question. The user can check one of the answers that are displayed with the question.

### Conditional styling/class names
Certain elements in this component have dynamic class names, which allows you to style them based on different circumstances. Those elements and circumstances are:

* Question prompt heading, which has a class name of ``unanswered``, ``correct``, or ``wrong`` depending on the question's status.

* Each checkbox text has a class name of ``not-graded``, ``wrong-answer``, or ``correct-answer``. The checkbox text has a class name of ``not-graded`` when the question has not been graded yet.