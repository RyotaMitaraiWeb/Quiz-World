import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UsersComponent,
  ],
  exports: [
    UsersComponent,
  ]
})
export class UsersModule { }
