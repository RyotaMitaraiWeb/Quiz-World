import { Component, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { QuizService } from '../../../features/quiz-service/quiz.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
  ) { }

  @Input({ required: true }) id = 0;

  deleteQuiz(id: number) {
    this.sub = this.quizService.deleteQuiz(id)
      .subscribe({
        next: () => {
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
