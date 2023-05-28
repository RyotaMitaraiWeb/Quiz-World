import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { IAppStore } from '../../types/store/store.types';
import { userReducer } from './user/user.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot<IAppStore>(
      {
        user: userReducer,
      }
    ),
  ]
})
export class AppStoreModule { }
