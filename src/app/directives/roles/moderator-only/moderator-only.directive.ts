import { Directive, inject, TemplateRef, ViewContainerRef, effect } from '@angular/core';
import { UserStore } from '../../../store/user/user.store';

/**
 * Displays the element only if the current user is a moderator
 */
@Directive({
  selector: '[appModeratorOnly]',
  standalone: true,
})
export class ModeratorOnlyDirective {
  private readonly user = inject(UserStore);
  private readonly templateRef = inject(TemplateRef<HTMLElement>);
  private readonly viewContainerRef = inject(ViewContainerRef);

  constructor() {
    effect(() => {
      const isModerator = this.user.isModerator();
      if (isModerator) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainerRef.clear();
      }
    });
  }
}
