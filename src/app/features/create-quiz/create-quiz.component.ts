import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { QuizService } from '../quiz-service/quiz.service';
import { Router } from '@angular/router';
import { IQuizFormSubmission } from '../../../types/components/quiz-form.types';
import { SharedModule } from '../../shared/shared.module';
import { successfulActionsMessages } from '../../constants/successfulActionsMessages.constants';
import { SnackbarService } from '../../core/snackbar/snackbar.service';

@Component({
  selector: 'app-create-quiz',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
  ],
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss']
})
export class CreateQuizComponent implements OnDestroy {
  private quizSub = new Subscription();

  constructor(
    private readonly quizService: QuizService,
    private readonly router: Router,
    private readonly snackbar: SnackbarService,
  ) { }

  createQuiz(quiz: IQuizFormSubmission): void {
    this.quizSub = this.quizService.create(quiz).subscribe({
      next: (res) => {
        const body = res.body;
        this.snackbar.open(successfulActionsMessages.quiz.create, 'Awesome!');
        
        this.router.navigate(['/quiz', body?.id.toString()]);
      },
      error: () => {
        this.snackbar.open('Your quiz could not be created! Ensure that all fields are valid and try again!', 'Sure!');
      }
    });
  }

  ngOnDestroy(): void {
    this.quizSub.unsubscribe();
  }

}
