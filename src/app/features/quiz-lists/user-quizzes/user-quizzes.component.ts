import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { ActivatedRoute, Data } from '@angular/router';
import { QuizService } from '../../quiz-service/quiz.service';
import { IProfile, IQuizList, order, sort } from '../../../../types/others/lists.types';
import { Observable, Subscription } from 'rxjs';
import { IUser } from '../../../../types/responses/administration.types';

@Component({
  selector: 'app-all-quizzes',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
  ],
  templateUrl: './user-quizzes.component.html',
  styleUrls: ['./user-quizzes.component.scss']
})
export class UserQuizzesComponent implements OnInit, OnDestroy {
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly quizService: QuizService,
  ) { }
  
  private catalogueSub = new Subscription();

  ngOnInit(): void {
    this.catalogueSub = this.getResolvedData().subscribe(data => {
      const profile = data['profile'] as IProfile;
      this.catalogue = profile.quizzes;
      const { id, username, roles } = profile;
      this.user = { id, username, roles };
    });
  }

  user: IUser = {
    id: '',
    username: '',
    roles: '',
  }

  catalogue: IQuizList = {
    total: 0,
    quizzes: [],
  };

  /**
   * returns the resolved data from the activated route. This is used
   * for easier spying in tests.
   */
  getResolvedData(): Observable<Data> {
    return this.activatedRoute.data;
  }

  /**
   * Updates the catalogue property with the fetched data.
   */
  updateQuizzes({ page, sort, order }: { page: number, sort: sort, order: order } ): void {
    this.catalogueSub = this.quizService.getUserQuizzes(this.user.id, page, sort, order).subscribe(data => {
      this.catalogue = data
    });
  }

  ngOnDestroy(): void {
    this.catalogueSub.unsubscribe();
  }
}
