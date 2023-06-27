import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { IAppStore } from '../../../../../types/store/store.types';
import { AuthService } from '../../../auth-service/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { restartUser } from '../../../../store/user/user.action';
import { HttpErrorResponse } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-logout-button',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.scss'],
})
export class LogoutButtonComponent implements OnDestroy {
  constructor(
    private readonly store: Store<IAppStore>,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) { }

  /**
   * Attempts to log the user out. Upon success, the user's state is restarted,
   * the user is redirected to the login page, and their localStorage token
   * is deleted.
   * @param event 
   */
  logout(event: Event): void {
    event.preventDefault();

    this.logoutSub = this.authService.logout()
      .subscribe({
        next: () => {
          localStorage.removeItem('token');
          this.store.dispatch(restartUser());
          this.router.navigate(['/login']);
        },
        error: (err: HttpErrorResponse) => {
          console.warn(err);
        }
      })
  }

  ngOnDestroy(): void {
    this.logoutSub.unsubscribe();
  }

  private logoutSub = new Subscription();
}
