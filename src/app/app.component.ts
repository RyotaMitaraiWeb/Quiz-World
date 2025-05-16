import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { UserStore } from './store/user/user.store';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { NavigationComponent } from './components/layout/navigation/navigation/navigation.component';
import { SidenavComponent } from './components/layout/sidenav/sidenav.component';
import { SidenavService } from './services/sidenav/sidenav.service';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterModule,
    NavigationComponent,
    SidenavComponent,
    MatSidenavModule,
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly userStore = inject(UserStore);
  protected readonly sidenav = inject(SidenavService);

  protected readonly sidenavIsOpen = computed(() => this.sidenav.isOpen());

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
