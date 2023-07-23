# <app-quiz-list-item>

## Usage
```html
<app-quiz-list-item [quiz]="{}"></app-quiz-list-item>
```

### @Input() properties
```typescript
class QuizListItemComponent {
  @Input() quiz: IQuizListItem;
}
```

* ``quiz`` - the quiz for which this card applies (**Required**)

Renders a ``<mat-card>`` that contains details about a given quiz. This card is meant to be rendered in a list of quizzes (such as a list of all quizzes, search results, and similar). The description is shortened to 50 characters if it's longer than that.