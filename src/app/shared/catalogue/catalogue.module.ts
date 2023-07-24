import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogueComponent } from './catalogue.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CatalogueComponent
  ],
  exports: [
    CatalogueComponent,
  ],
})
export class CatalogueModule { }
