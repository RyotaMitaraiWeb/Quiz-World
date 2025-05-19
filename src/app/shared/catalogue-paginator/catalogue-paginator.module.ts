import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CataloguePaginatorComponent } from './catalogue-paginator.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CataloguePaginatorComponent
  ],
  exports: [
    CataloguePaginatorComponent,
  ]
})
export class CataloguePaginatorModule { }
