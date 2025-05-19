import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { UserStore } from '../../../store/user/user.store';

@Component({
  selector: 'app-home-logged-in',
  imports: [
    MatCardModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './home-logged-in.component.html',
  styleUrl: './home-logged-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeLoggedInComponent {
  private readonly userStore = inject(UserStore);
  protected readonly username = computed(() => this.userStore.username());
}
