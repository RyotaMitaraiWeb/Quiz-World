import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { UserStore } from './store/user/user.store';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { NavigationComponent } from './components/layout/navigation/navigation/navigation.component';
import { SidenavComponent } from './components/layout/sidenav/sidenav.component';
import { SidenavService } from './services/sidenav/sidenav.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterModule,
    NavigationComponent,
    SidenavComponent,
    MatSidenavModule,
    AsyncPipe,
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly userStore = inject(UserStore);
  protected readonly sidenav = inject(SidenavService);

  private readonly breakpointObserver = inject(BreakpointObserver);
  protected readonly isMobile$ = this.breakpointObserver.observe('(max-width: 1024px)')
    .pipe(
      map(breakpoint => breakpoint.matches),
  );

  ngOnInit(): void {
    this.authService.retrieveSession().subscribe({
      next: (result) => {
        const { username, id, roles } = result;
        this.userStore.updateUser({ username, id, roles });
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === HttpStatusCode.Unauthorized) {
          localStorage.removeItem('token');
        }
      },
    });
  }
}
