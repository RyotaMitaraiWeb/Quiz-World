import { NgModule, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateQuizComponent } from './create-quiz.component';
import { Subscription } from 'rxjs';
import { QuizService } from '../quiz-service/quiz.service';
import { IQuizFormSubmission } from '../../../types/components/quiz-form.types';
import { Router } from '@angular/router';
import { QuizFormComponent } from '../../shared/quiz-form/quiz-form.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CreateQuizComponent,
  ],
  exports: [
    CreateQuizComponent
  ]
})
export class CreateQuizModule {}
