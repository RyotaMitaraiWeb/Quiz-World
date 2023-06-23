# app-quiz-session

## Usage

```html
<app-quiz-session [questions]="[]" [instantMode]="false" [quizId]="1"></app-quiz-session>
```

### @Input() properties
```typescript
class QuizSessionComponent implements OnInit, OnDestroy {
  @Input() questions: ISessionQuestion[];
  @Input() instantMode;
  @Input() quizId;
}
```

* ``questions`` - the list of questions that the user can answer in this quiz (**Required**)
* ``instantMode`` - whether the quiz is instant mode or not. If ``instantMode`` is ``false``, a button that grades all questions will be rendered (**Required**).
* ``quizId`` - the ID of the quiz (**Required**).

Renders a ``<form>`` that displays all questions in the quiz.

When the component is initialized via ``ngOnInit``, a reactive form will be constructed in the ``form`` property that correctly reflects the overall structure of the quiz. The form is a form array that consists of a form group for each question. However, each form group's ``currentAnswers`` control can be implemented in different ways; for example, for multiple-choice questions, it will be constructed as a form array, wheres other questions would receive a mere form control instead.

In addition to the above, two maps, ``questionKeys`` and ``prompts``, will also be constructed. Read below for more information.

## Methods and other properties
```typescript
(property) questionKeys: Map<number, ISessionAnswer[] | null>;
```
This map stores the correct answers for each question (by their ID). A map is used here over a simple array in order to pass the correct answers to the correct components even if the order were randomized.

When the component is initialized, all keys of the map will have ``null`` as value, which indicates that the question has not been graded yet (check the ``gradeQuestions`` method reference for more information on how this is updated). In addition, this map is used as a basis for the *ngFor loop in the template. As mentioned above, this allows the session to function properly even if the order of the questions is randomized.

```typescript
(property) prompts: Map<number, string>;
```
This map stores the prompts for each question. Like the ``questionKeys`` map, it is constructed via ``ngOnInit`` and is used to make the quiz work with randomized order.

```typescript
function gradeQuestions(event: Event): void
```
Creates a subscription which grades all questions. If the
quiz is NOT in instant mode and the quiz has not been graded, this
method will fetch the correct answers for each question, update the
``questionKeys`` map with each question's correct answers and disable the form.

The ``questionKeys`` map will pass the correct answers to each question, which
will update its status via their ``ngOnChanges`` implementation.