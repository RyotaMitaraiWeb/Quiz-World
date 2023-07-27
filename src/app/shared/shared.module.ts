import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionModule } from './quiz-form/question/question.module';
import { QuizFormModule } from './quiz-form/quiz-form.module';
import { ShortenPipe } from './pipes/shorten/shorten.pipe';
import { QuizListItemModule } from './quiz-list-item/quiz-list-item.module';
import { CatalogueSelectMenuModule } from './catalogue-select-menu/catalogue-select-menu.module';
import { CataloguePaginatorModule } from './catalogue-paginator/catalogue-paginator.module';
import { CatalogueModule } from './catalogue/catalogue.module';
import { EditButtonModule } from './buttons/edit-button/edit-button.module';
import { DeleteButtonModule } from './buttons/delete-button/delete-button.module';
import { SheetComponent } from './sheet/sheet.component';

@NgModule({
  imports: [
    CommonModule,
    QuestionModule,
    QuizFormModule,
    ShortenPipe,
    QuizListItemModule,
    CatalogueModule,
    EditButtonModule,
    DeleteButtonModule,
    SheetComponent
  ],
  exports: [
    QuestionModule,
    QuizFormModule,
    QuizListItemModule,
    ShortenPipe,
    CatalogueSelectMenuModule,
    CataloguePaginatorModule,
    CatalogueModule,
    DeleteButtonModule,
    EditButtonModule,
    SheetComponent
  ],
})
export class SharedModule { }
