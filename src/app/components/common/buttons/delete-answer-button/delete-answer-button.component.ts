import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-delete-answer-button',
  imports: [MatButtonModule, MatTooltipModule, MatIconModule],
  templateUrl: './delete-answer-button.component.html',
  styleUrl: './delete-answer-button.component.scss',
})
export class DeleteAnswerButtonComponent {}
