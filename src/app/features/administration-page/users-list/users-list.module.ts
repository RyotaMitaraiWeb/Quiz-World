import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list.component';
import { ModeratorsComponent } from './moderators/moderators.component';



@NgModule({
  imports: [
    CommonModule,
    UsersListComponent,
  ],
  exports: [
    UsersListComponent,
  ]
})
export class UsersListModule { }
