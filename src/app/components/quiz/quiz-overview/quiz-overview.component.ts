import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { DatePipe } from '@angular/common';
import { QuizStore } from '../../../store/quiz/quiz.store';
import { OwnerOnlyDirective } from '../../../directives/roles/owner-only/owner-only.directive';
import { EditButtonComponent } from '../../common/buttons/edit-button/edit-button.component';
import { DeleteButtonComponent } from '../../common/buttons/delete-button/delete-button.component';
import { Router, RouterModule } from '@angular/router';
import { AvatarComponent } from '../../common/avatar/avatar.component';
import { api } from '../../../common/api';
@Component({
  selector: 'app-quiz-overview',
  imports: [
    RouterModule,
    MatCardModule,
    MatChipsModule,
    DatePipe,
    OwnerOnlyDirective,
    EditButtonComponent,
    DeleteButtonComponent,
    AvatarComponent,
],
  templateUrl: './quiz-overview.component.html',
  styleUrl: './quiz-overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizOverviewComponent {
  protected readonly quiz = inject(QuizStore);
  private readonly router = inject(Router);

  protected readonly avatarSrc = computed(() => {
    const username = this.quiz.creatorUsername();
    return api.images.profilePictures.getByUsername(username);
  });

  redirectToHome() {
    this.router.navigate(['']);
  }
}
