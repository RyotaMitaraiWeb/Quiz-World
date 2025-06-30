import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { UserState } from '../../../store/user/user.store';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { AvatarComponent } from '../../common/avatar/avatar.component';
import { api } from '../../../common/api';

@Component({
  selector: 'app-profile-overview',
  imports: [MatListModule, MatIconModule, AvatarComponent],
  templateUrl: './profile-overview.component.html',
  styleUrl: './profile-overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileOverviewComponent {
  user = input.required<UserState>();
  protected readonly roles = computed(() => this.user().roles.join(', '));
  protected readonly avatarSrc = computed(() => api.images.profilePictures.getByUsername(this.user().username));
}
