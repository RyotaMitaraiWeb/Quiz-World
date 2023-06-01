import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionModule } from './quiz-form/question/question.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [QuestionModule]
})
export class SharedModule { }
