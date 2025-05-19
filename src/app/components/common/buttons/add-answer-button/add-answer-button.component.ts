import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-add-answer-button',
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './add-answer-button.component.html',
  styleUrl: './add-answer-button.component.scss',
})
export class AddAnswerButtonComponent {
  correct = input(false);
}
