import { ChangeDetectionStrategy, Component, inject, OnDestroy, signal } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';
import { AuthBody } from '../../../services/auth/types';
import { NgOptimizedImage } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { loginErrors } from '../../../common/validationErrors/login';
import { PasswordVisibilityButtonComponent } from '../../../components/auth/login/password-visibility-button/password-visibility-button.component';
import { SingleInputErrorPipe } from '../../../pipes/single-input-error/single-input-error.pipe';
import { SignalrService } from '../../../services/signalr/signalr.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SNACKBAR_DURATION, snackbarAction, snackbarMessages } from '../../../common/snackbar';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    NgOptimizedImage,
    PasswordVisibilityButtonComponent,
    SingleInputErrorPipe,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly snackbar = inject(MatSnackBar);
  private readonly router = inject(Router);
  protected errorMessages = loginErrors;
  protected usernameErrors = loginErrors.username;
  protected passwordErrors = loginErrors.password;
  private readonly connection = inject(SignalrService);

  private loginSub?: Subscription;

  loginForm = new FormGroup({
    username: new FormControl('', { validators: [Validators.required] }),
    password: new FormControl('', { validators: [Validators.required] }),
  });

  submit(event: SubmitEvent) {
    event.preventDefault();

    if (this.loginForm.invalid) {
      return;
    }

    this.submitting.set(true);

    const body: AuthBody = {
      username: this.loginForm.controls.username.value || '',
      password: this.loginForm.controls.password.value || '',
    };

    this.loginSub = this.authService.login(body).subscribe({
      next: (user) => {
        const { token } = user;
        localStorage.setItem('token', token);
        this.router.navigate(['']);
        this.loginFailed.set(false);
        this.submitting.set(false);
        this.connection.connect();
        this.snackbar.open(snackbarMessages.success.login, snackbarAction, {
          duration: SNACKBAR_DURATION,
        });
      },
      error: (e: HttpErrorResponse) => {
        if (e.status === HttpStatusCode.Unauthorized) {
          this.loginFailed.set(true);
        }

        this.submitting.set(false);
      },
    });
  }

  ngOnDestroy(): void {
    this.loginSub?.unsubscribe();
  }

  protected loginFailed = signal(false);
  protected submitting = signal(false);

  protected passwordIsVisible = signal(false);
}
