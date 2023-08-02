import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { QuizService } from '../quiz-service/quiz.service';
import { Router } from '@angular/router';
import { IQuizForm, IQuizFormSubmission } from '../../../types/components/quiz-form.types';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-create-quiz',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule
  ],
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss']
})
export class CreateQuizComponent implements OnDestroy {
  private quizSub = new Subscription();

  constructor(
    private readonly quizService: QuizService,
    private readonly router: Router,
  ) { }

  createQuiz(quiz: IQuizForm): void {
    this.quizSub = this.quizService.create(quiz).subscribe({
      next: (res) => {
        const body = res.body;
        this.router.navigate(['/quiz', body?.id.toString()]);
      },
      error: (err) => {
        console.warn(err);
      }
    })
  }

  ngOnDestroy(): void {
    this.quizSub.unsubscribe();
  }

}
