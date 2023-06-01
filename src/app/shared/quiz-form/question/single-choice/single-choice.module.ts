import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleChoiceComponent } from './single-choice.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SingleChoiceComponent,
  ],
  exports: [SingleChoiceComponent],
})
export class SingleChoiceModule { }
