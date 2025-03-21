import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { QuizForm } from '../types';
import { MatStepperModule } from '@angular/material/stepper';
import { QuizFormBasicDataComponent } from '../quiz-form-basic-data/quiz-form-basic-data.component';
import { MatButtonModule } from '@angular/material/button';
import { QuizFormQuestionsComponent } from '../quiz-form-questions/quiz-form-questions.component';
import { MatCardModule } from '@angular/material/card';
import { SharedCreateEditQuizFormService } from '../../../services/shared/shared-create-edit-quiz-form.service';
import { QuizFormSummaryComponent } from '../quiz-form-summary/quiz-form-summary.component';

@Component({
  selector: 'app-quiz-form',
  imports: [
    MatStepperModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    QuizFormBasicDataComponent,
    QuizFormQuestionsComponent,
    QuizFormSummaryComponent,
],
  templateUrl: './quiz-form.component.html',
  styleUrl: './quiz-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizFormComponent {
  private readonly sharedForm = inject(SharedCreateEditQuizFormService);
  readonly basicDataForm = this.sharedForm.basicDataForm;

  readonly questionsForm = this.sharedForm.questionsForm;

  edit = input(false);
  quizSubmit = output<QuizForm>();

  submit(event: MouseEvent) {
    event.preventDefault();

    const basic = this.basicDataForm;
    const questions = this.questionsForm;

    this.quizSubmit.emit({ basic, questions });
  }
}

