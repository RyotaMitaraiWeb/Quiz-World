import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { IAppStore } from '../../../../types/store/store.types';
import { selectUserRoles } from '../../../store/user/user.selector';
import { RouterModule } from '@angular/router';
import { role } from '../../../../types/auth/roles.types';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  constructor(private readonly store: Store<IAppStore>) { }
  ngOnInit(): void {
    this.store.select(selectUserRoles).subscribe(state => {
      this.userRoles = state;
    });
  }

  userRoles!: role[];

  /**
   * Returns ``true`` if the ``userRoles`` property is an empty array,
   * otherwise returns ``false``
   */
  get isGuest() {
    return this.userRoles.length === 0;
  }

  /**
   * Tracks the current viewport. This is used in place of CSS media queries for
   * testability.
   */
  getInnerWidth() {
    return window.innerWidth;
  }
}
