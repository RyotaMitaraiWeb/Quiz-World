import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllQuizzesComponent } from './all-quizzes.component';
import { SharedModule } from '../../../shared/shared.module';

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
