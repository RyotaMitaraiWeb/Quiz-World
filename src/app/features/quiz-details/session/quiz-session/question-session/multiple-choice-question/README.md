# app-multiple-choice-question

## Usage

```html
<app-multiple-choice-question [correctAnswers]="[]" prompt="Question prompt" [answers]="[]" [form]="insert form array here"></app-multiple-choice-question>
```

### @Input() properties
```typescript
class MultipleChoiceQuestionComponent implements IQuestionComponent, OnChanges {
  @Input() correctAnswers: ISessionAnswer[] | null;
  @Input() prompt: string;
  @Input() answers: ISessionAnswer[];
  @Input() form: FormGroup<
    {
      currentAnswer: FormArray<FormControl<string | null>>;
      id: FormControl<number | null>;
      type: FormControl<question | null>;
    }
  >;
}
```

* ``correctAnswers`` - an array of all answers that are considered correct for the given question. Pass ``null`` to the property to indicate that the question has not been graded yet (**Required**).
* ``prompt`` - represents the prompt of the question (**Required**)
* ``answers`` - represents all answers that the user can potentially check when the question is rendered (**Required**).
* ``form`` - represents the part of the overall form that this instance of the component will manipulate. The form is passed from a parent component for a few reasons:
* * this allows the parent components to easily check whether the user has given an answer to this question and thereby enable or disable the grade buttons.
* * related to the above, this also gives this component a way to communicate with the parent components about the validity of the user input by manually setting and resetting errors for this form.
* * the user's answers can be persisted through the form even after the questions are graded (which causes the component to be rerendered), as the checkboxes' checked status is determined by whether their value exists in the form. This allows the user to see which answers they have checked after the question is graded.
(**Required**)

**Note** unlike in other question components, this component's ``form``'s ``currentAnswers`` control is a ``FormArray``, which may require different initialization in the parent component.

Renders a section that represents a multiple-choice question. The user can check any answer which they consider to be correct. The question is considered valid for the quiz session form if the user has checked at least one of the answers.

### Conditional styling/class names
Certain elements in this component have dynamic class names, which allows you to style them based on different circumstances. Those elements and circumstances are:

* Question prompt heading, which has a class name of ``unanswered``, ``correct``, or ``wrong`` depending on the question's status.

* Each checkbox text has a class name of ``not-graded``, ``wrong-answer``, or ``correct-answer``. The checkbox text has a class name of ``not-graded`` when the question has not been graded yet.

## Methods and getters
```typescript
get isCorrect(): boolean | null
```
Returns ``null`` if ``correctAnswers`` is ``null`` (which means that the question has not been graded yet) or a boolean value that indicates whether the user has answered correctly or not. The user has answered correctly if they have given all correct answers and have not given any wrong answer. The order of the answers does not matter.

This getter uses a superset algorithm to compare the user's answer to the correct answers. This algorithm asymptotically takes O(n) time on average.

**Note:** this getter has an early exit for if the correct answers' amount
is different from the user's answers'. If the correct answers looks like
``[1, 2, 3]`` and the user answers look like ``[1, 2, 3, 3]``, this will still
return ``false``, even though all of the user's answers are technically correct.


```typescript
function answerClass(id: number): "not-graded" | "correct-answer" | "wrong-answer";
```
Returns a string that indicates whether the answer with the given ID is correct or wrong, which can be used as a class name within the template. If the question has not been graded (aka ``correctAnswers`` is ``null``), the method will return ``not-graded``.

```typescript
function updateAnswers(event: MatCheckboxChange): void
```

Mutates the ``currentAnswers`` form array. When the user checks the checkbox,
the answer's ID is added to the array. When unchecking it, the ID is removed. Adding an answer to the form array will cause the form to be considered valid. Removing the last checked answer (resulting in the form array being empty) renders the form invalid.

If the ID of the answer derived from the uncheck event cannot be found within the form, this method will throw an error.

```typescript
get currentAnswers(): (string | null)[]
```
Returns an array that consists of the IDs of the answers whose checkboxes have been checked.