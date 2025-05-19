import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizSessionComponent } from './quiz-session.component';
import { QuestionSessionModule } from './question-session/question-session.module';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    QuizSessionComponent,
    QuestionSessionModule
  ],
  exports: [
    QuizSessionComponent,
  ]
})
export class QuizSessionModule { }
