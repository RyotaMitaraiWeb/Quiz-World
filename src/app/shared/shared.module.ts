import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionModule } from './quiz-form/question/question.module';
import { QuizFormModule } from './quiz-form/quiz-form.module';
import { ShortenPipe } from './pipes/shorten/shorten.pipe';
import { QuizListItemModule } from './quiz-list-item/quiz-list-item.module';
import { CatalogueSelectMenuModule } from './catalogue-select-menu/catalogue-select-menu.module';

@NgModule({
  imports: [
    CommonModule,
    QuestionModule,
    QuizFormModule,
    ShortenPipe,
    QuizListItemModule
  ],
  exports: [
    QuestionModule,
    QuizFormModule,
    QuizListItemModule,
    ShortenPipe,
    CatalogueSelectMenuModule,
  ],
})
export class SharedModule { }
