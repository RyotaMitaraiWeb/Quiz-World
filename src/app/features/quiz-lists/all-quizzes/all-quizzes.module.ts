import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllQuizzesComponent } from './all-quizzes.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AllQuizzesComponent,
  ],
  exports: [
    AllQuizzesComponent,
  ]
})
export class AllQuizzesModule { }
