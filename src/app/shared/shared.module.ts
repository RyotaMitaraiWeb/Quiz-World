import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionModule } from './quiz-form/question/question.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    QuestionModule,
  ],
  exports: [QuestionModule]
})
export class SharedModule { }
