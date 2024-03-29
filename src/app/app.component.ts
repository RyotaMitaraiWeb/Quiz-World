import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppStore } from '../types/store/store.types';
import { AuthService } from './core/auth-service/auth.service';
import { restartUser, setUser } from './store/user/user.action';
import { HttpErrorResponse } from '@angular/common/http';
import { NavigationStart, Router } from '@angular/router';
import { closeMenu } from './store/menu/menu.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private readonly store: Store<IAppStore>,
    private readonly authService: AuthService,
    private readonly router: Router,
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
          console.log(err);
          
          this.store.dispatch(restartUser());
          if (err.status < 500) {
            localStorage.removeItem('token');
          }
        }
      });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.store.dispatch(closeMenu());
      }
    })
  }
  title = 'quiz-world';

  menuIsOpen = this.store.select(store => store.menu.open);
}
