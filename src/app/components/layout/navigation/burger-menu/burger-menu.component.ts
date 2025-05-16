import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SidenavService } from '../../../../services/sidenav/sidenav.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReturnFocusOnSidenavCloseDirective } from '../../../../directives/return-focus-on-sidenav-close/return-focus-on-sidenav-close.directive';

@Component({
  selector: 'app-burger-menu',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    ReturnFocusOnSidenavCloseDirective,
  ],
  templateUrl: './burger-menu.component.html',
  styleUrl: './burger-menu.component.scss',
})
export class BurgerMenuComponent {
  private readonly sidenav = inject(SidenavService);
  protected readonly isOpen = computed(() => this.sidenav.isOpen());

  toggleSidenav() {
    this.sidenav.toggle();
  }
}
