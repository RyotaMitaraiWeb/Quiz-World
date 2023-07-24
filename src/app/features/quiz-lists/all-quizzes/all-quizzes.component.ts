import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { ActivatedRoute, Data } from '@angular/router';
import { QuizService } from '../../quiz-service/quiz.service';
import { IQuizList, order, sort } from '../../../../types/others/lists.types';
import { Observable, Subscription } from 'rxjs';

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
    private readonly activatedRoute: ActivatedRoute,
    private readonly quizService: QuizService,
  ) { }
  
  private catalogueSub = new Subscription();

  ngOnInit(): void {
    this.catalogueSub = this.getResolvedData().subscribe(data => {
      this.catalogue = data['catalogue'];
    });
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
    this.catalogueSub = this.quizService.getAllQuizzes(page, sort, order).subscribe(data => {
      this.catalogue = data
    });
  }

  ngOnDestroy(): void {
    this.catalogueSub.unsubscribe();
  }
}
