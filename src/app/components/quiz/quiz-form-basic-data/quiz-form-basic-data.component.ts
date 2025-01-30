import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SingleInputErrorPipe } from '../../../pipes/single-input-error/single-input-error.pipe';
import { quizErrors } from '../../../common/validationErrors/quiz-form';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { quizValidationRules } from '../../../common/validationRules/quiz-form';
import { SharedCreateEditQuizFormService } from '../../../services/shared/shared-create-edit-quiz-form.service';

@Component({
  selector: 'app-quiz-form-basic-data',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    CdkTextareaAutosize,
    SingleInputErrorPipe,
  ],
  templateUrl: './quiz-form-basic-data.component.html',
  styleUrl: './quiz-form-basic-data.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizFormBasicDataComponent {
  private readonly sharedForm = inject(SharedCreateEditQuizFormService);
  form = this.sharedForm.basicDataForm;

  protected titleErrorMessages = quizErrors.title;
  protected descriptionErrorMessages = quizErrors.description;
  protected maxDescriptionLength = quizValidationRules.description.maxlength;
  protected maxTitleLength = quizValidationRules.title.maxlength;
}
