import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UsersListComponent,
  ],
  exports: [
    UsersListComponent,
  ]
})
export class UsersListModule { }
