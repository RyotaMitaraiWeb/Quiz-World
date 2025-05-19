import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserQuizzesComponent } from './user-quizzes.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserQuizzesComponent,
  ],
  exports: [
    UserQuizzesComponent,
  ]
})
export class UserQuizzesModule { }
