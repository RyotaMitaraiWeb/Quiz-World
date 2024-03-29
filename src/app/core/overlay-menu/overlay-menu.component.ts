import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppStore } from '../../../types/store/store.types';
import { RoleService } from '../role-service/role.service';
import { LogoutButtonComponent } from '../header/navigation/logout-button/logout-button.component';
import { closeMenu } from '../../store/menu/menu.action';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-overlay-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LogoutButtonComponent,
    MatIconModule,
  ],
  templateUrl: './overlay-menu.component.html',
  styleUrls: ['./overlay-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OverlayMenuComponent {
  constructor(
    private readonly roleService: RoleService,
    private readonly store: Store<IAppStore>,
  ) { }

  open = this.store.select(store => store.menu.open);

  disappear = false;
  
  closeMenu(): void {
    this.disappear = true;
    setTimeout(() => {
      this.store.dispatch(closeMenu());
      this.disappear = false;
    }, 500);
  }

  protected isGuest() {
    return this.roleService.isGuest();
  }

  protected isAdmin() {
    return this.roleService.isAdmin();
  }
}
