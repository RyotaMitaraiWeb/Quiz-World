import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppStore } from '../types/store/store.types';
import { AuthService } from './core/auth-service/auth.service';
import { restartUser, setUser } from './store/user/user.action';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private readonly store: Store<IAppStore>,
    private readonly authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.retrieveSession()
      .subscribe({
        next: res => {
          const body = res.body!;
          this.store.dispatch(setUser({
            id: body.id,
            username: body.username,
            roles: body.roles,
          }));
        },
        error: (err: HttpErrorResponse) => {
          this.store.dispatch(restartUser());
          if (err.status < 500) {
            localStorage.removeItem('token');
          }
        }
      })
  }
  title = 'quiz-world';


}
