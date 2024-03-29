# app-quiz-form

## Usage

```html
<app-quiz-form [questions]="insert questions here"></app-quiz-form>
```

### @Input() properties
```typescript
class QuizFormComponent {
  @Input() questions: IQuestionSubmission[];
  @Input() title = '';
  @Input() description = '';
  @Input() edit = false;
}
```
Passing the props is needed only when editing a particular quiz form; when the context is creating a new quiz, you can safely skip passing those.

* ``questions`` - a list of questions to be populated in the form, defaults to an array of one element: a single-choice question with an empty prompt, correct answer, and wrong answer.
* ``title`` - the title of the form, defaults to an empty string.
* ``description`` - the description of the form, defaults to an empty string.
* ``edit`` - whether the form is editing a quiz or not (default ``false``). When in edit mode, the user is unable to change whether the quiz is instant mode or not; this will disable the respective field and won't render the field in the template.

### Output events
```typescript
@Output() submitEvent = new EventEmitter<IQuizFormSubmission>();
```
This event is emitted when the form is submitted.

Renders a ``form`` that itself renders an ``<app-question>`` for each question in the ``form`` property, alongside a few other fields/controls:
* title
* description
* instant mode (when not in edit mode)

Instant mode means that the user can check whether they have given the correct answer without having to submit the entire form. The field won't be rendered if in edit mode and its form control will be disabled.

The submit button updates reactively updates its disabled status.

### Methods
```typescript
function addQuestion(event: Event): void
```
Adds an empty single-choice question to the questions control of the form. Does nothing if there are 100 questions.

```typescript
function removeQuestionAt(index: number, event: Event): void
```
Removes the control at the given index of the questions control. If the form has only one question or the field at the given index does not exist, throws an error.