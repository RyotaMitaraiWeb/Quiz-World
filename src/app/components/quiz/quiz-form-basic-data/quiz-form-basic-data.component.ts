import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { QuizBasicDataForm } from '../types';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-quiz-form-basic-data',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
  ],
  templateUrl: './quiz-form-basic-data.component.html',
  styleUrl: './quiz-form-basic-data.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizFormBasicDataComponent {
  form = input.required<QuizBasicDataForm>();
}
