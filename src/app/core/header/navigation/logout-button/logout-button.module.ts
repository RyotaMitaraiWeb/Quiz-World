import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutButtonComponent } from './logout-button.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LogoutButtonComponent,
  ],
  exports: [
    LogoutButtonComponent,
  ]
})
export class LogoutButtonModule { }
