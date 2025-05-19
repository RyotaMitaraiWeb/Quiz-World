import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { AppStoreModule } from '../../store/app-store.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HeaderComponent,
    AppStoreModule,
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
