import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NavigationComponent
  ],
  exports: [
    NavigationComponent,
  ]
})
export class NavigationModule { }
