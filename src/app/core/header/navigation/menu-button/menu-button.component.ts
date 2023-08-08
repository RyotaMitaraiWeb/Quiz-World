import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { IAppStore } from '../../../../../types/store/store.types';
import { Subscription } from 'rxjs';
import { closeMenu, openMenu } from '../../../../store/menu/menu.action';

@Component({
  selector: 'app-menu-button',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss'],
})
export class MenuButtonComponent {
  constructor(
    private readonly store: Store<IAppStore>
  ) {}

  ngOnInit() {
    this.openSub = this.store.select(store => store.menu.open).subscribe(open => {
      this.open = open;
    })
  }

  open = false;

  toggle(event: Event) {
    event.preventDefault();

    if (this.open) {
      this.store.dispatch(closeMenu());
    } else {
      this.store.dispatch(openMenu());
    }
  }

  openSub = new Subscription();
}
