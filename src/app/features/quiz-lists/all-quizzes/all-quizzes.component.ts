import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { IQuizList, IQuizListItem } from '../../../../types/others/lists.types';

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
export class AllQuizzesComponent {
  protected quizzes: IQuizList = {
    quizzes: [
      {
        id: 1,
        instantMode: true,
        title: 'a',
        description: 'a',
        createdOn: '01/04/2022',
      },
      {
        id: 2,
        instantMode: true,
        title: 'a',
        description: 'a',
        createdOn: '01/04/2022',
      },
      {
        id: 3,
        instantMode: true,
        title: 'a',
        description: 'a',
        createdOn: '01/04/2022',
      },
      {
        id: 4,
        instantMode: true,
        title: 'a',
        description: 'a',
        createdOn: '01/04/2022',
      },
      {
        id: 5,
        instantMode: true,
        title: 'a',
        description: 'a',
        createdOn: '01/04/2022',
      },
      {
        id: 6,
        instantMode: true,
        title: 'a',
        description: 'a',
        createdOn: '01/04/2022',
      },
      {
        id: 7,
        instantMode: true,
        title: 'a',
        description: 'a',
        createdOn: '01/04/2022',
      },
    ],
    total: 8,
  }

  next: IQuizListItem = {
    id: 8,
    instantMode: true,
    title: 'a',
    description: 'a',
    createdOn: '01/04/2022',
  };

  changePage(value: number) {
    this.quizzes.quizzes = [this.next];
  }
}
