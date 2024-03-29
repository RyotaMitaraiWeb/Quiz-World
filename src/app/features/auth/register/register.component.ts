import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppStore } from '../../../../types/store/store.types';
import { AuthService } from '../../../core/auth-service/auth.service';
import { UniqueUsernameValidator } from '../../validators/unique-username-validator/unique-username.validator';
import { Subscription } from 'rxjs';
import { IAuthBody } from '../../../../types/auth/general.types';
import { setUser } from '../../../store/user/user.action';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedModule } from '../../../shared/shared.module';
import { validationRules } from '../../../constants/validationRules.constants';
import { successfulActionsMessages } from '../../../constants/successfulActionsMessages.constants';
import { SnackbarService } from '../../../core/snackbar/snackbar.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    SharedModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy {
  constructor(
    private readonly store: Store<IAppStore>,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly fb: FormBuilder,
    private readonly uniqueUsernameValidator: UniqueUsernameValidator,
    private readonly snackbar: SnackbarService,
  ) { }

  protected usernameRules = validationRules.register.username;
  protected passwordRules = validationRules.register.password;

  form = this.fb.group({
    username: ['', {
      validators: [
        Validators.required,
        Validators.minLength(this.usernameRules.minlength),
        Validators.maxLength(this.usernameRules.maxlength),
        Validators.pattern(this.usernameRules.pattern),
      ],
      asyncValidators: [this.uniqueUsernameValidator]
    }],
    password: ['',
      [
        Validators.required,
        Validators.minLength(this.passwordRules.minlength)
      ]
    ]
  });

  passwordIsVisible = false;

  togglePasswordVisibility(event: Event): void {
    event.preventDefault();
    this.passwordIsVisible = !this.passwordIsVisible;
  }

  protected controlError(control: 'username' | 'password') {
    return this.form.controls[control].errors;
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

  register(event: Event): void {
    event.preventDefault();

    const { username, password } = this.form.value as any;

    const body: IAuthBody = {
      username,
      password
    }

    this.registerSub = this.authService.register(body)
      .subscribe({
        next: (res) => {
          const body = res.body!;

          this.store.dispatch(setUser({
            id: body.id,
            username: body.username,
            roles: body.roles,
          }));

          localStorage.setItem('token', body.token);
          this.snackbar.open(successfulActionsMessages.register, 'Awesome!');
          
          this.router.navigate(['/']);
        },
        error: () => {
          this.snackbar.open('Your registration is invalid! Please verify that all fields are valid and try again!');
        }
      });
  }

  private registerSub = new Subscription();

  ngOnDestroy(): void {
    this.registerSub.unsubscribe();
  }

}
