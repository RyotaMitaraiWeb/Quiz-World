import { Component, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { QuizService } from '../../../features/quiz-service/quiz.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { successfulActionsMessages } from '../../../constants/successfulActionsMessages.constants';

@Component({
  selector: 'app-delete-button',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss']
})
export class DeleteButtonComponent implements OnDestroy {
  constructor(
    private readonly quizService: QuizService,
    private readonly router: Router,
    private readonly snackbar: MatSnackBar,
  ) { }

  @Input({ required: true }) id = 0;

  deleteQuiz(id: number) {
    this.sub = this.quizService.deleteQuiz(id)
      .subscribe({
        next: () => {
          this.snackbar.open(successfulActionsMessages.quiz.delete, 'Got it!', {
            duration: 7000,
          });
          
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.warn(err)
        },
      });
  }

  private sub = new Subscription();

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
