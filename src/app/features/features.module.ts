import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizSessionModule } from './quiz-details/session/quiz-session/quiz-session.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    QuizSessionModule,
  ],
  exports: [
    QuizSessionModule,
  ]
})
export class FeaturesModule { }
