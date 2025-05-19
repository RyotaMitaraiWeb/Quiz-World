import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QuizFormGuideComponent } from '../quiz-form-guide/quiz-form-guide.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-quiz-form-guide-button',
  imports: [MatButtonModule],
  templateUrl: './quiz-form-guide-button.component.html',
  styleUrl: './quiz-form-guide-button.component.scss',
})
export class QuizFormGuideButtonComponent {
  private readonly dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(QuizFormGuideComponent, {
      maxWidth: '80vw',
      width: '80vw',
    });
  }
}
