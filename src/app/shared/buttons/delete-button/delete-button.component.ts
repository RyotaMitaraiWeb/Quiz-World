import { Component, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { QuizService } from '../../../features/quiz-service/quiz.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { successfulActionsMessages } from '../../../constants/successfulActionsMessages.constants';
import { SnackbarService } from '../../../core/snackbar/snackbar.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-delete-button',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss']
})
export class DeleteButtonComponent implements OnDestroy {
  constructor(
    private readonly quizService: QuizService,
    private readonly router: Router,
    private readonly snackbar: SnackbarService,
  ) { }

  @Input({ required: true }) id = 0;

  deleteQuiz(id: number) {
    this.sub = this.quizService.deleteQuiz(id)
      .subscribe({
        next: () => {
          this.snackbar.open(successfulActionsMessages.quiz.delete, 'Got it!');
          
          this.router.navigate(['/']);
        },
        error: (err: HttpErrorResponse) => {
          this.snackbar.open(err.error)
        }
      });
  }

  private sub = new Subscription();

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
