import { Component, inject, OnDestroy, signal } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { UserStore } from '../../../store/user/user.store';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { PasswordVisibilityButtonComponent } from '../../../components/auth/login/password-visibility-button/password-visibility-button.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';
import { registerErrorMessages } from '../../../common/validationErrors/register';
import { registerValidationRules } from '../../../common/validationRules/register';
import { SingleInputErrorPipe } from '../../../pipes/single-input-error/single-input-error.pipe';
import { AuthBody } from '../../../services/auth/types';
import { Subscription } from 'rxjs';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { uniqueUsernameValidatorAsync } from '../../../validators/unique-username/unique-username.validator';

@Component({
  selector: 'app-register',
  imports: [MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    PasswordVisibilityButtonComponent,
    NgOptimizedImage,
    SingleInputErrorPipe,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly userStore = inject(UserStore);

  registerForm = new FormGroup({
    username: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(registerValidationRules.username.minlength),
        Validators.maxLength(registerValidationRules.username.maxlength),
        Validators.pattern(registerValidationRules.username.pattern)
      ],
      asyncValidators: [uniqueUsernameValidatorAsync()],
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(registerValidationRules.password.minlength)
      ]
    }),
  });


  submit(event: SubmitEvent) {
    event.preventDefault();

    this.submitting.set(true);

    const body: AuthBody = {
      username: this.registerForm.controls.username.value || '',
      password: this.registerForm.controls.password.value || '',
    };

    if (this.registerForm.valid) {
      this._registerSub = this.authService.register(body).subscribe({
        next: (result) => {
          const { token, ...user } = result;
          localStorage.setItem('token', token);
          this.userStore.updateUser(user);
          this.router.navigate(['']);
          this.submitting.set(false);
        },
        error: () => {
          this.submitting.set(false);
        },
      });
    }
  }

  protected passwordIsVisible = signal(false);
  protected submitting = signal(false);

  protected usernameErrorMessages = registerErrorMessages.username;
  protected passwordErrorMessages = registerErrorMessages.password;

  private _registerSub?: Subscription;

  ngOnDestroy() {
    this._registerSub?.unsubscribe();
  }
}
