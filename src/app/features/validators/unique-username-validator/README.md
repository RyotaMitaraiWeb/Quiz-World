# UniqueUsernameValidator
An injectable validator for checking if a particular username has already been taken by another user.

## Usage
This validator's ``validate`` method sends a GET request to ``/auth/username/{username}`` (where ``{username}`` is the form control's value). If the response status is 404, the validator returns ``null``, otherwise returns the following object: ``{ uniqueUsername: string }``.

The error message depends on whether the response status is 200 (aka the username is taken) or not (indicator of a possible HTTP request failure).

The request is debounced by 1.5 seconds.

## Example
```typescript
export class ExampleComponent implements OnInit {
  constructor(
    private readonly fb: FormBuilder,
    private readonly uniqueUsernameValidator: UniqueUsernameValidator,
  ) { }

  ngOnInit() {
    this.form.patchValue({
      username: 'someusername',
    });

    const errors = this.form.controls.username.errors;
    /*
      The above will be ``null`` if the request returns 404 error or
      ``{ uniqueUsername: '[insert correct message here]'}`` for any other status
      code.
     */
  }

  form = this.fb.group({
    username: ['', [Validators.required], [this.uniqueUsernameValidator]],
  });
}
```