import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription, of } from 'rxjs';
import { IEditQuizForm, IQuizForm, IQuizFormSubmission } from '../../../types/components/quiz-form.types';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../quiz-service/quiz.service';
import { IQuizDetails } from '../../../types/responses/quiz.types';
import { SharedModule } from '../../shared/shared.module';
import { questionTypes } from '../../constants/question-types.constants';

@Component({
  selector: 'app-edit-quiz',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
  ],
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.scss']
})
export class EditQuizComponent implements OnInit, OnDestroy {
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly quizService: QuizService,
    private readonly router: Router,
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
        this.router.navigate(['/quiz', this.quiz.id.toString()])
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
  }

  quiz: IEditQuizForm = {
    id: 0,
    title: '',
    description: '',
    questions: [],
  }

}
