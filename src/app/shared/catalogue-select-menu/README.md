# app-catalogue-select-menu

## Usage
```html
<app-catalogue-select-menu (select)="myFunc($event)"></app-catalogue-select-menu>
```

### @Output events
* ``select`` - an event that is emitted when the user selects a new option from the menu. The ``$event`` is of type ``ISort`` and holds the sort options the user wants.

Renders a ``<mat-select>`` that emits an event with the needed data when the user selects a new option. This is used to sort quizzes in a catalogue page. The parent component can use it to fetch the quizzes in the desired order.