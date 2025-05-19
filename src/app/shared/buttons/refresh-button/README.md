# app-refresh-button

## Usage
```html
<app-refresh-button (click)="myFunc()"></app-refresh-button>
```

### @Output() properties
* ``click`` - this event is emitted when the button is clicked. It does not hold or pass any data, it merely notifies the parent component that it has been clicked.


Renders a button with a refresh icon and a tooltip that hints to the user that clicking the button will cause some sort of a refresh. The actual refresh should be handled by a parent component.

## Other remarks
* this button can be styled by a parent component by targetting the ``refresh-btn`` class.