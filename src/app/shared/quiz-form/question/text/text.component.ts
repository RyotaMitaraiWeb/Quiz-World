import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { questionTypes, shortQuestionTypes } from '../../../../constants/question-types.constants';
import { AnswersManagersFactoryService } from '../../../../features/answers-managers-factory/answers-managers-factory.service';
import { TextAnswersManager } from '../../../../util/AnswersManager/managers/Text/TextAnswersManager';

@Component({
  selector: 'app-text',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
})
export class TextComponent {
  constructor(
    private readonly factory: AnswersManagersFactoryService,
    private readonly fb: FormBuilder
  ) {
    this.manager = this.factory.createManager('text', this.form.controls.answers);
  }

  private readonly manager: TextAnswersManager;

  ngOnInit() {
    this.manager.form = this.form.controls.answers;
  }

  @Input({ required: true }) form = this.fb.group({
    prompt: ['', [Validators.required, Validators.maxLength(100)]],
    answers: this.fb.array([
      this.fb.group({
        value: ['', [Validators.required, Validators.maxLength(100)]],
        correct: [true],
      })
    ]),
    type: [questionTypes.text]
  });

  protected addField(event: Event) {
    event.preventDefault();
    this.manager.addField();
  }

  protected get answerControls() {
    return this.manager.answers;
  }

  protected getErrorsAt(index: number) {    
    return this.manager.getErrorsAt(index);
  }

  protected removeFieldAt(index: number, event: Event) {
    event.preventDefault();
    this.manager.removeFieldAt(index);
  }

  protected get deleteButtonIsVisible() {
    return this.manager.canRemoveFields;
  }

  protected get canAddField() {
    return this.manager.canAddField;
  }
}
