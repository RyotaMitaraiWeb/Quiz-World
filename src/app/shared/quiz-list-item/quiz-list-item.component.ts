import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { RoleService } from '../../core/role-service/role.service';
import { IQuizListItem } from '../../../types/others/lists.types';
import { ShortenPipe } from '../pipes/shorten/shorten.pipe';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-quiz-list-item',
  standalone: true,
  imports: [
    CommonModule,
    ShortenPipe,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './quiz-list-item.component.html',
  styleUrls: ['./quiz-list-item.component.scss']
})
export class QuizListItemComponent {
  constructor(
    private readonly router: Router,
    private readonly roleService: RoleService,
  ) { }

  @Input({ required: true }) quiz: IQuizListItem = {
    id: 0,
    title: '',
    description: '',
    instantMode: false,
    createdOn: ''
  };
}
