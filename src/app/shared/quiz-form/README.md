# app-quiz-form

## Usage

```html
<app-quiz-form [questions]="insert questions here"></app-quiz-form>
```

### @Input() properties
```typescript
class QuizFormComponent {
  @Input() questions: IQuestionSubmission[];
}
```

* ``questions`` - a list of questions to be populated in the form (in the context of editing), defaults to an array of one element: a single-choice question with an empty promp, correct answer, and wrong answer.

Renders a ``form`` that itself renders an ``<app-question>`` for each question in the ``form`` property.

### Methods
```typescript
function addQuestion(event: Event): void
```
Adds an empty single-choice question to the questions control of the form.

```typescript
function removeQuestionAt(index: number, event: Event): void
```
Removes the control at the given index of the questions control. If the form has only one question or the field at the given index does not exist, throws an error.