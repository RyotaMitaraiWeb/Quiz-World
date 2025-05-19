import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './question.component';
import { MultipleChoiceComponent } from './multiple-choice/multiple-choice.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    QuestionComponent,
  ],
  exports: [
    QuestionComponent,
  ]
})
export class QuestionModule { }
