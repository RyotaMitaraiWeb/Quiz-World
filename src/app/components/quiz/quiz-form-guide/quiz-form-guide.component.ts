import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-quiz-form-guide',
  imports: [MatButtonModule, MatDialogModule, MatTabsModule, NgOptimizedImage],
  templateUrl: './quiz-form-guide.component.html',
  styleUrl: './quiz-form-guide.component.scss',
})
export class QuizFormGuideComponent {

}
