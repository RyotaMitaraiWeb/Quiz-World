import { Component, computed, inject, OnDestroy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { SidenavService } from '../../../services/sidenav/sidenav.service';
import { UserStore } from '../../../store/user/user.store';
import { AuthService } from '../../../services/auth/auth.service';
import { Subscription } from 'rxjs';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-sidenav',
  imports: [
    MatIconModule,
    RouterModule,
    MatRippleModule,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent implements OnDestroy {
  private readonly sidenav = inject(SidenavService);
  private readonly router = inject(Router);
  private readonly userStore = inject(UserStore);
  private readonly auth = inject(AuthService);

  protected readonly isOpen = computed(() => this.sidenav.isOpen());
  protected readonly tabIndex = computed(() => this.isOpen() ? 0 : -1);
  private readonly isLoggedIn = computed(() => this.userStore.isLoggedIn());
  private readonly isLoggedOut = computed(() => !this.userStore.isLoggedIn());
  private readonly username = computed(() => this.userStore.username());

  protected readonly links: Link[] = [
    {
      icon: 'home',
      href: '/',
      text: 'Home',
    },
    {
      icon: 'add',
      href: '/quiz/create',
      text: 'New quiz',
    },
    {
      icon: 'person',
      href: `/profile/${this.username()}`,
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
      icon: 'register',
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
  ];

  private logout() {
    this.logoutSub = this.auth.logout().subscribe({
      next: () => {
        this.userStore.logout();
        this.router.navigate(['auth', 'login']);
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

  ngOnDestroy() {
    this.logoutSub?.unsubscribe();
  }
}

interface Link {
  icon: string;
  href?: string;
  text: string;
  action?: () => void;
  condition?: () => boolean;
}
