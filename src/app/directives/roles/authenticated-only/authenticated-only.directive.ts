import { Directive, inject, TemplateRef, ViewContainerRef, effect } from '@angular/core';
import { UserStore } from '../../../store/user/user.store';

/**
 * Displays the element only when the user is logged in
 */
@Directive({
  selector: '[appAuthenticatedOnly]',
  standalone: true,
})
export class AuthenticatedOnlyDirective {
  private readonly user = inject(UserStore);
  private readonly templateRef = inject(TemplateRef<HTMLElement>);
  private readonly viewContainerRef = inject(ViewContainerRef);

  constructor() {
    effect(() => {
      const isLoggedIn = this.user.roles().length > 0;
      if (isLoggedIn) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainerRef.clear();
      }
    });
  }
}
