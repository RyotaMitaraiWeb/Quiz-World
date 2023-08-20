# SnackbarService
A service that encapsulates the Angular Material Snackbar.

**Note:** normally, this service requires ``MatSnackbarModule`` to be imported within a component. In this case, however, the module is imported in ``AppModule``, meaning that this service can be safely injected anywhere in the app.

## Methods
```typescript
function open(message: string, action: string, ...classNames: string[]): void;
function open(message: string[], action: string, ...classNames: string[]): void;
function open(message: string[], action: string): void;
function open(message: string, action: string): void;
function open(message: string[]): void;
function open(message: string): void;
function open(message: string | string[], action?: string, ...classNames: string[]): void
```
Encapsulates the Angular Material Snackbar's ``open`` method by adding additional configurations to the snackbar.

``message`` is the message displayed on the left side of the snackbar. Providing an array of messages will result in those messages being separated by a new line.

``action`` is the text of the button displayed on the right side of the snackbar. Clicking the button closes the snackbar. If ``action`` is ``undefined``, no button is shown and the snackbar can only be hidden after a certain amount of time.

``classNames`` are any additional classes that you want apply to the snackbar container. All snackbar containers have the ``prewrap`` class name, which you can target with global styling. If ``undefined`` is passed, no additional class names will be applied to the container

By default, ``AppModule`` configures the timeout for the snackbar to be seven seconds. If you want to change the duration in a test, configure your testing module's providers with the following settings:

```typescript
 TestBed.configureTestingModule({
  imports: [MatSnackBarModule], // + any other modules you may want
  providers: [
    { 
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, 
      useValue: { duration: 0 }, // or whatever duration you want
    },
  ]
});
```

