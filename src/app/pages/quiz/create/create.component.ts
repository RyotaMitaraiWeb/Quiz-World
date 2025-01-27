import { ChangeDetectionStrategy, Component } from '@angular/core';
import { QuizFormComponent } from '../../../components/quiz/quiz-form/quiz-form.component';
@Component({
  selector: 'app-create',
  imports: [QuizFormComponent],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateQuizComponent {}

