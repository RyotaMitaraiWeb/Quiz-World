import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-button',
  imports: [RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './edit-button.component.html',
  styleUrl: './edit-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditButtonComponent {
  quizId = input.required<number>();
}
