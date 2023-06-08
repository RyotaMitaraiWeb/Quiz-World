import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizFormComponent } from './quiz-form.component';
import { QuestionModule } from './question/question.module';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    QuizFormComponent,
    QuestionModule,
  ],
  exports: [
    QuizFormComponent,
  ]
})
export class QuizFormModule { }
