import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { UserState } from '../../../store/user/user.store';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profile-overview',
  imports: [MatListModule, MatIconModule],
  templateUrl: './profile-overview.component.html',
  styleUrl: './profile-overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileOverviewComponent {
  user = input.required<UserState>();
  protected readonly roles = computed(() => this.user().roles.join(', '));
}
