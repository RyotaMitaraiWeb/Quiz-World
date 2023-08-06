# app-catalogue-select-menu

## Usage
```html
<app-catalogue-select-menu (select)="myFunc($event)" (selectedValue)="title-desc"
[options]="{ 'Title (Descending)': 'title-desc'}"></app-catalogue-select-menu>
```

### @Input properties
```typescript
class CatalogueSelectMenuComponent implements OnInit, OnChanges {
  @Input({ required: true }) selectedValue = '';
  @Input({ required: true }) options: Record<string, string> = {};
}
```

* ``options`` - key-value pairs of strings, representing all the options that will be rendered in the menu. The key is the text with which the option will be displayed and the value is the option's internal value (and the one that will be emitted when the user selects an option). The order of the options matches the order of the properties. (**Required**).
* ``selectedValue`` - the initial value for the select menu (**Required**).

### @Output events
* ``select`` - an event that is emitted when the user selects a new option from the menu. The ``$event`` is of type ``string`` and holds the sort options the user wants.

Renders a ``<mat-select>`` that emits an event with the needed data when the user selects a new option. This is used to sort items in a catalogue page. The parent component can use it to fetch data in the desired order.