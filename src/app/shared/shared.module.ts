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
import { ChangeRoleButtonModule } from './buttons/roles/change-role-button/change-role-button.module';
import { RefreshButtonComponent } from './buttons/refresh-button/refresh-button.component';
import { DisableOnLoadingDirective } from './directives/disable-on-loading/disable-on-loading.directive';

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
    SheetComponent,
    RefreshButtonComponent,
    DisableOnLoadingDirective,
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
    SheetComponent,
    ChangeRoleButtonModule,
    RefreshButtonComponent,
    DisableOnLoadingDirective,
  ],
})
export class SharedModule { }
