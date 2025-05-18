import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionSessionComponent } from './question-session.component';
import { TextQuestionComponent } from './text-question/text-question.component';
import { TextQuestionModule } from './text-question/text-question.module';
import { MultipleChoiceQuestionModule } from './multiple-choice-question/multiple-choice-question.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    QuestionSessionComponent,
  ],
  exports: [
    QuestionSessionComponent,
  ],
})
export class QuestionSessionModule {
  
}
