import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { IAppStore } from '../../../../../types/store/store.types';
import { Subscription } from 'rxjs';
import { closeMenu, openMenu } from '../../../../store/menu/menu.action';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-menu-button',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss'],
})
export class MenuButtonComponent implements OnInit, OnDestroy {
  constructor(
    private readonly store: Store<IAppStore>
  ) { }

  ngOnInit() {
    this.openSub = this.store.select(store => store.menu.open).subscribe(open => {
      this.open = open;
    });
  }

  open = false;

  toggle(event: Event): void {
    event.preventDefault();

    if (this.open) {
      this.store.dispatch(closeMenu());
    } else {
      this.store.dispatch(openMenu());
    }
  }

  private openSub = new Subscription();

  ngOnDestroy(): void {
    this.openSub.unsubscribe();
  }
}
