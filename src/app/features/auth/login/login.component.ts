import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../../core/auth-service/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppStore } from '../../../../types/store/store.types';
import { IAuthBody } from '../../../../types/auth/general.types';
import { setUser } from '../../../store/user/user.action';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { UniqueUsernameValidator } from '../../validators/unique-username-validator/unique-username.validator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { selectUserRoles } from '../../../store/user/user.selector';
import { IAuthSuccessResponse } from '../../../../types/responses/auth.types';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  constructor(
    private readonly authService: AuthService,
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly store: Store<IAppStore>,
  ) { }

  form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  protected controlError(control: 'username' | 'password') {
    return this.form.controls[control].errors;
  }

  passwordIsVisible = false;
  togglePasswordVisibility(event: Event): void {
    event.preventDefault();
    this.passwordIsVisible = !this.passwordIsVisible;
  }

  protected get passwordFieldAriaLabel() {
    return this.passwordIsVisible ? 'Hide password' : 'Show password';
  }

  protected get passwordVisibilityIcon() {
    return this.passwordIsVisible ? 'visibility_off' : 'visibility';
  }

  protected get passwordFieldType() {
    return this.passwordIsVisible ? 'text' : 'password';
  }

  /**
   * Sends a request to the server to log in the user. If the login is successful,
   * the user is redirected to the home page, the local storage is updated with
   * the returned token, and the store is updated with the authenticated user.
   * @param event 
   */
  login(event: Event): void {
    event.preventDefault();

    const body: IAuthBody = {
      username: this.form.controls.username.value!,
      password: this.form.controls.password.value!,
    };

    this.loginSub = this.authService.login(body)
      .subscribe({
        next: (res) => {
          const body = res.body!;

          this.store.dispatch(setUser({
            id: body.id,
            username: body.username,
            roles: body.roles,
          }));

          localStorage.setItem('token', body.token);
          this.router.navigate(['/']);
        },
        error: (err: HttpErrorResponse) => {
          console.warn(err);
        }
      });
  }

  private loginSub = new Subscription();

  ngOnDestroy(): void {
    this.loginSub.unsubscribe();
  }
}
