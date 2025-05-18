import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogueSelectMenuComponent } from './catalogue-select-menu.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CatalogueSelectMenuComponent,
  ],
  exports: [
    CatalogueSelectMenuComponent,
  ]
})
export class CatalogueSelectMenuModule { }
