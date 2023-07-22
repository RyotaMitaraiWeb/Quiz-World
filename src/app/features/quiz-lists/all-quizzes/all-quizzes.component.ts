import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { IQuizList, IQuizListItem, order, sort } from '../../../../types/others/lists.types';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../quiz-service/quiz.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-all-quizzes',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
  ],
  templateUrl: './all-quizzes.component.html',
  styleUrls: ['./all-quizzes.component.scss']
})
export class AllQuizzesComponent implements OnInit, OnDestroy {
  constructor(
    private readonly location: Location,
    private readonly quizService: QuizService,
    private readonly activatedRoute: ActivatedRoute,
  ) { }

  private paramsSub: Subscription = new Subscription();
  private catalogueSub: Subscription = new Subscription();

  ngOnInit(): void {
    this.page = Number(this.activatedRoute.snapshot.queryParamMap.get('page')) || 1;
    this.sort = this.activatedRoute.snapshot.queryParamMap.get('sort') as sort || 'title';
    this.order = this.activatedRoute.snapshot.queryParamMap.get('order') as order || 'asc';

    this.catalogueSub = this.getResolvedData().subscribe(data => {
      this.catalogue = data['catalogue'];
    });
  }

  getResolvedData() {
    return this.activatedRoute.data;
  }

  catalogue: IQuizList = {
    total: 0,
    quizzes: [],
  };
  page = 0;
  sort: sort = 'title';
  order: order = 'asc';

  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
    this.catalogueSub.unsubscribe();
  }

}
