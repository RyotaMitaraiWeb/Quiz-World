import { Directive, effect, inject, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserStore } from '../../../store/user/user.store';

/**
 * Displays the element only if the current user is an administrator
 */
@Directive({
  selector: '[appAdminOnly]',
})
export class AdminOnlyDirective {
  private readonly user = inject(UserStore);
  private readonly templateRef = inject(TemplateRef<HTMLElement>);
  private readonly viewContainerRef = inject(ViewContainerRef);

  constructor() {
    effect(() => {
      const isAdmin = this.user.isAdmin();
      if (isAdmin) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainerRef.clear();
      }
    });
  }
}
