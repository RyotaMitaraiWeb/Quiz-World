import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionModule } from './quiz-form/question/question.module';
import { QuizFormModule } from './quiz-form/quiz-form.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    QuestionModule,
    QuizFormModule,
  ],
  exports: [QuestionModule, QuizFormModule]
})
export class SharedModule { }
