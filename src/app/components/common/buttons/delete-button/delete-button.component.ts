import { Component, inject, input, output, OnDestroy } from '@angular/core';
import { QuizService } from '../../../../services/quiz/quiz.service';
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-delete-button',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './delete-button.component.html',
  styleUrl: './delete-button.component.scss',
})
export class DeleteButtonComponent implements OnDestroy {
  private readonly quizService = inject(QuizService);
  quizId = input.required<number>();

  afterDelete = output();

  deleteQuiz(event: MouseEvent) {
    event.preventDefault();
    this._deleteSub = this.quizService.deleteQuiz(this.quizId()).subscribe({
      next: () => {
        if (this.afterDelete) {
          this.afterDelete.emit();
        }
      },
      error: () => {
        //
      },
    });
  }

  ngOnDestroy() {
    this._deleteSub?.unsubscribe();
  }

  private _deleteSub?: Subscription;
}
