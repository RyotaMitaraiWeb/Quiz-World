import { ChangeDetectionStrategy, Component, inject, OnDestroy, signal } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { UserStore } from '../../../store/user/user.store';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';
import { AuthBody } from '../../../services/auth/types';
import { NgOptimizedImage } from '@angular/common'
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';




@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, NgOptimizedImage],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly userStore = inject(UserStore);
  private readonly router = inject(Router);

  private loginSub?: Subscription;

  loginForm = new FormGroup({
    username: new FormControl('', { validators: [Validators.required] }),
    password: new FormControl('', { validators: [Validators.required] }),
  });

  submit(event: SubmitEvent) {
    event.preventDefault();
    const body: AuthBody = {
      username: this.loginForm.controls.username.value || '',
      password: this.loginForm.controls.password.value || '',
    }

    this.loginSub = this.authService.login(body).subscribe({
      next: (user) => {
        const { token, ...userData } = user;
        localStorage.setItem('token', token);
        this.userStore.updateUser(userData);
        this.router.navigate(['']);
        this.loginFailed.set(true);
      },
      error: (e: HttpErrorResponse) => {
        if (e.status === HttpStatusCode.Unauthorized) {
          this.loginFailed.set(true);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.loginSub?.unsubscribe();
  }

  loginFailed = signal(false);
}
