import { ChangeDetectionStrategy, Component } from '@angular/core';
import { QuizFormComponent } from '../../../components/quiz/quiz-form/quiz-form.component';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-create',
  imports: [QuizFormComponent, MatButtonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateQuizComponent {}

