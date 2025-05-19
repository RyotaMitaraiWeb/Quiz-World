import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HomeLoggedInComponent } from '../../components/home/home-logged-in/home-logged-in.component';
import { GuestOnlyDirective } from '../../directives/roles/guest-only/guest-only.directive';
import { AuthenticatedOnlyDirective } from '../../directives/roles/authenticated-only/authenticated-only.directive';
import { UserStore } from '../../store/user/user.store';
import { HomeGuestComponent } from '../../components/home/home-guest/home-guest.component';

@Component({
  selector: 'app-home',
  imports: [
    HomeLoggedInComponent,
    GuestOnlyDirective,
    AuthenticatedOnlyDirective,
    HomeGuestComponent,
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly userStore = inject(UserStore);
  protected readonly username = this.userStore.username;
}
