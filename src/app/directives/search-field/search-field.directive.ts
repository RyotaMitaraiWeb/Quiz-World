import { Directive, inject } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';

/**
 * A directive that turns forms into functional search fields.
 *
 * This directive should be attached to a ``<form>`` tag that uses
 * reactive forms. The form group in question should have a form control
 * named ``query``.
 *
 * The directive will cause the form to redirect the user to the search page with
 * the appropriate query when it is submitted. If the field is empty,
 * the redirect does not happen.
 */
@Directive({
  selector: '[appSearchField]',
  host: {
    '(submit)': 'submit($event)',
  },
})
export class SearchFieldDirective {
  private readonly form = inject(FormGroupDirective);
  private readonly router = inject(Router);

  submit(event: SubmitEvent) {
    event.preventDefault();
    const query = this.form.value.query as string;
    if (query) {
      this.router.navigate(['quiz', 'search'], {
        queryParams: { query },
      });
    }
  }
}
