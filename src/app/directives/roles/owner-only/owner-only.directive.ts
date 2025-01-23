import { Directive, effect, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { role } from '../../../common/roles';
import { UserStore } from '../../../store/user/user.store';

/**
 * Displays the element only if the user is the "owner" of it. A user is considered
 * its owner if the owner ID and user ID match.
 *
 * Roles can be configured with ``rolesThatCanAlsoSee`` that allow users
 * with those roles to also see the element, even if they aren't their owners
 */
@Directive({
  selector: '[appOwnerOnly]',
})
export class OwnerOnlyDirective {
  @Input({ required: true })
  appOwnerOnly!: string;

  @Input() appOwnerOnlyRolesThatCanAlsoSee?: role[];

  private readonly user = inject(UserStore);
  private readonly templateRef: TemplateRef<HTMLElement> = inject(TemplateRef<HTMLElement>);
  private readonly viewContainerRef: ViewContainerRef = inject(ViewContainerRef);

  constructor() {
    effect(() => {
      const userMatchesRoles = this.userMatchesRoles(this.user.roles());
      const userId = this.user.id();

      if (userMatchesRoles || (userId === this.appOwnerOnly && userId)) {
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        } else  {
          this.viewContainerRef.clear();
        }
    });
  }


  private userMatchesRoles(userRoles: role[]) {
    const requiredRoles = this.appOwnerOnlyRolesThatCanAlsoSee;
    if (!requiredRoles || userRoles?.length === 0) {
      return false;
    }

    for (const role of requiredRoles) {
      if (!userRoles.includes(role)) {
        return false;
      }
    }

    return true;
  }
}
