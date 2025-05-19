import { Component, input, signal, OnInit, OnDestroy, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { UserState } from '../../store/user/user.store';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { ProfileOverviewComponent } from '../../components/profile/profile-overview/profile-overview.component';
import { UserQuizzesListComponent } from '../../components/profile/user-quizzes-list/user-quizzes-list.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  imports: [
    MatTabsModule,
    MatIconModule,
    ProfileOverviewComponent,
    UserQuizzesListComponent,
],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit, OnDestroy {
  username = input.required<string>();
  private readonly authService = inject(AuthService);
  private readonly title = inject(Title);

  user = signal<UserState>(
    {
      id: '',
      username: '',
      roles: [],
    },
  );

  ngOnInit() {
    this._profileSub = this.authService.getProfileByUsername(this.username())
      .subscribe({
        next: (user) => {
          this.user.set(user);
          this.title.setTitle(`${user.username}'s profile | Quiz World`);
        },
        error() {
          //
        },
      });
  }

  ngOnDestroy() {
    this._profileSub?.unsubscribe();
  }

  private _profileSub?: Subscription;
}
