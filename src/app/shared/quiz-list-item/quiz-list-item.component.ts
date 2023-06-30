import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RoleService } from '../../core/role-service/role.service';

@Component({
  selector: 'app-quiz-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-list-item.component.html',
  styleUrls: ['./quiz-list-item.component.scss']
})
export class QuizListItemComponent {
  constructor(
    private readonly router: Router,
    private readonly roleService: RoleService,
  ) { }
}
