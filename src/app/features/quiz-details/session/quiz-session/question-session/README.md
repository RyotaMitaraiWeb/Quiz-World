# app-question-session

## Usage

```html
<app-question-session [correctAnswers]="[]" prompt="Question prompt" [form]="insert form here" [instantMode]="true" [type]="text" [answers]="[]"></app-question-session>
```

### @Input() properties
```typescript
class QuestionSessionComponent implements OnChanges, OnDestroy {
  @Input() prompt: string;
  @Input() answers: ISessionAnswer[] | undefined;
  @Input() correctAnswers: ISessionAnswer[] | null;
  @Input() instantMode: boolean;
  @Input() type: question | null;
  @Input() form: FormGroup<
    {
      currentAnswer: any;
      id: FormControl<number | null>;
      type: FormControl<question | null>;
    }
  >;
}
```

* ``correctAnswers`` - an array of all answers that are considered correct for the given question. Pass ``null`` to the property to indicate that the question has not been graded yet (**Required**).
* ``prompt`` - represents the prompt of the question (**Required**)
* ``form`` - represents the part of the overall form that this instance of the component will manipulate. This allows the component to communicate the current state of the question to the parent component (**Required**).
* * ``currentAnswers`` can theoritically be anything because different questions have different ways of handling what the current answer is. For example, the multiple-choice question component handles the current answers as a form array, wheres the others use a form control.
* ``answers`` - the available answers which the user can interact with for the question. ``undefined`` means that the question does not provide answers to the user (such as text questions) (**Required**).
* ``type`` - the type of question, which is used to determine what question component should be rendered. Because the type of question is often provided from a form control, it is typed as ``question | null`` (**Required**).
* ``instantMode`` - whether the quiz is in instant mode or not. If ``instantMode`` is ``true``, a button to grade the current question will be displayed (**Required**).

Renders a wrapper that renders the appropriate question component based on the ``type`` property. This component is interacted with by users during a quiz session. When the quiz is instant mode, a button will be displayed, which allows the user to check if they have answered the question correctly.

## Methods
```typescript
function gradeAnswer(event: Event): void
```
Creates a subscription which grades the specific question. If the quiz is in instant mode and the question has not been graded, this method will fetch the correct answers for the given question and set the ``correctAnswers`` property to those answers and then disable the form. All child components that accept those correct answers will update their status via their ``ngOnChanges`` implementation.