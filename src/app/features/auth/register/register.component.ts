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
  ) { }

  form = this.fb.group({
    username: ['', {
      validators: [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(15),
        Validators.pattern(/^[a-z0-9]+$/i)
      ],
      asyncValidators: [this.uniqueUsernameValidator]
    }],
    password: ['',
      [
        Validators.required,
        Validators.minLength(6)
      ]
    ]
  });

  passwordIsVisible = false;

  togglePasswordVisibility(event: Event): void {
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
          this.router.navigate(['/']);
        },
        error: (err: HttpErrorResponse) => {
          console.warn(err);
        }
      })

  }

  private registerSub = new Subscription();

  ngOnDestroy(): void {
    this.registerSub.unsubscribe();
  }

}
