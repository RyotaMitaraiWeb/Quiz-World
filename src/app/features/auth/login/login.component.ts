import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/auth-service/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppStore } from '../../../../types/store/store.types';
import { IAuthBody } from '../../../../types/auth/general.types';
import { setUser } from '../../../store/user/user.action';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
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
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  login(event: Event) {
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
