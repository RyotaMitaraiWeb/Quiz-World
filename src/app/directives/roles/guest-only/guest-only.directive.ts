import { Directive, effect, inject, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserStore } from '../../../store/user/user.store';

/**
 * Displays the element only when the user is NOT logged in
 */
@Directive({
  selector: '[appGuestOnly]',
})
export class GuestOnlyDirective {

  private readonly user = inject(UserStore);
  private readonly templateRef = inject(TemplateRef<HTMLElement>);
  private readonly viewContainerRef = inject(ViewContainerRef);

  constructor() {
    effect(() => {
      const isLoggedIn = this.user.roles().length > 0;
      if (!isLoggedIn) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainerRef.clear();
      }
    });
  }

}
