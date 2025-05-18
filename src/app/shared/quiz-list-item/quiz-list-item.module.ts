import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizListItemComponent } from './quiz-list-item.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    QuizListItemComponent,
  ],
  exports: [
    QuizListItemComponent
  ]
})
export class QuizListItemModule { }
