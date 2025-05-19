# app-catalogue-paginator

## Usage
```html
<app-catalogue-paginator [total]="100" [page]="2" (pageEvent)="myFunc()"></app-catalogue-paginator>
```

### @Input() properties
* ``page`` - the page at which the paginator starts. This can be provided if
the component is loaded for the first time via an URL with an already-supplied query string for a page. Defaults to 1 if not provided.
* ``total`` - the amount of quizzes that exist in the database that satisfy given criteria (if there is such. For example, if this paginator is used on a search page, it should reflect the amount of quizzes that contain a given string in their titles) (**Required**).

### @Output() properties
* ``pageEvent`` - emitted when the user changes the page. Passes the new page as an argument.

Renders a ``<mat-paginator>`` that notifies the parent component when a page is changed. Note that ``<mat-paginator>`` works with zero-based indices; this component emits and accepts values in one-based indices (so if you want to start at page 2, simply pass ``2`` to the ``page`` property and the component will take care of converting it to the correct index).

