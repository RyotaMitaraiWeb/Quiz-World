import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { IEditQuizForm,IQuizFormSubmission } from '../../../types/components/quiz-form.types';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../quiz-service/quiz.service';
import { SharedModule } from '../../shared/shared.module';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { successfulActionsMessages } from '../../constants/successfulActionsMessages.constants';

@Component({
  selector: 'app-edit-quiz',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    MatSnackBarModule,
  ],
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.scss']
})
export class EditQuizComponent implements OnInit, OnDestroy {
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly quizService: QuizService,
    private readonly router: Router,
    private readonly snackbar: MatSnackBar
  ) {}
  private quizSub = new Subscription();
  private editSub = new Subscription();

  ngOnInit(): void {
    this.quizSub = this.getResolvedData().subscribe(data => {
      this.quiz = data['quiz'];      
    });
  }

  editQuiz(quiz: IQuizFormSubmission): void {
    this.editSub = this.quizService.edit(this.quiz.id, quiz).subscribe({
      next: () => {
        this.snackbar.open(successfulActionsMessages.quiz.edit, 'Awesome!', {
          duration: 7000,
        });
        this.router.navigate(['/quiz', this.quiz.id.toString()]);
      },
      error: (err) => {
        console.warn(err);
        
      }
    })
  }

  getResolvedData() {
    return this.activatedRoute.data;
  }

  ngOnDestroy(): void {
    this.quizSub.unsubscribe();
    this.editSub.unsubscribe();
  }

  quiz: IEditQuizForm = {
    id: 0,
    title: '',
    description: '',
    questions: [],
  }

}
