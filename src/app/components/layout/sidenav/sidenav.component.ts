import { ChangeDetectionStrategy, Component, computed, inject, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { SidenavService } from '../../../services/sidenav/sidenav.service';
import { UserStore } from '../../../store/user/user.store';
import { AuthService } from '../../../services/auth/auth.service';
import { filter, Subscription } from 'rxjs';
import { MatRippleModule } from '@angular/material/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { SignalrService } from '../../../services/signalr/signalr.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SNACKBAR_DURATION, snackbarAction, snackbarMessages } from '../../../common/snackbar';

@Component({
  selector: 'app-sidenav',
  imports: [
    MatIconModule,
    RouterModule,
    MatRippleModule,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent implements OnDestroy, OnInit {
  private readonly sidenav = inject(SidenavService);
  private readonly router = inject(Router);
  private readonly userStore = inject(UserStore);
  private readonly auth = inject(AuthService);
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly connection = inject(SignalrService);
  private readonly snackbar = inject(MatSnackBar);

  protected readonly isOpen = computed(() => this.sidenav.isOpen());
  protected readonly tabIndex = computed(() => this.isOpen() ? 0 : -1);
  private readonly isLoggedIn = computed(() => this.userStore.isLoggedIn());
  private readonly isLoggedOut = computed(() => !this.userStore.isLoggedIn());
  private readonly username = computed(() => this.userStore.username());


  protected readonly links = computed<Link[]>(() => [
    {
      icon: 'home',
      href: '/',
      text: 'Home',
    },
    {
      icon: 'list',
      href: '/quiz/all',
      text: 'Browse all quizzes',
    },
    {
      icon: 'add',
      href: '/quiz/create',
      text: 'New quiz',
      condition: this.isLoggedIn,
    },
    {
      icon: 'account_circle',
      href: `/profile/user/${this.username()}`,
      text: 'My profile',
      condition: this.isLoggedIn,
    },
    {
      icon: 'login',
      href: '/auth/login',
      text: 'Login',
      condition: this.isLoggedOut,
    },
    {
      icon: 'app_registration',
      href: '/auth/register',
      text: 'Register',
      condition: this.isLoggedOut,
    },
    {
      icon: 'logout',
      text: 'Logout',
      condition: this.isLoggedIn,
      action: () => this.logout(),
    },
    {
      icon: 'close',
      text: 'Close menu',
      action: () => this.closeSidenav(),
    },
  ]);

  ngOnInit() {
    this.breakpointSub = this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
      )
      .subscribe(() => {
        if (this.breakpointObserver.isMatched('(max-width: 1024px)')) {
          this.sidenav.close();
        }
      });
  }

  private logout() {
    this.logoutSub = this.auth.logout().subscribe({
      next: () => {
        this.userStore.logout();
        this.connection.disconnect();
        this.router.navigate(['auth', 'login']);
        this.snackbar.open(snackbarMessages.success.logout, snackbarAction, {
          duration: SNACKBAR_DURATION,
        });
        this.sidenav.close();
      },
      error() {
        //
      },
    });
  }

  closeSidenav() {
    this.sidenav.close();
  }

  private logoutSub?: Subscription;
  private breakpointSub?: Subscription;

  ngOnDestroy() {
    this.logoutSub?.unsubscribe();
    this.breakpointSub?.unsubscribe();
  }
}

interface Link {
  icon: string;
  href?: string;
  text: string;
  action?: () => void;
  condition?: () => boolean;
}
