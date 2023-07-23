import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AnswersManager } from '../../../../util/AnswersManager/AnswersManager';
import { questionTypes } from '../../../../constants/question-types.constants';

@Component({
  selector: 'app-text',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent {
  constructor(private readonly fb: FormBuilder) {
  }

  ngOnInit() {
    this.answersManager = new AnswersManager(this.form.controls.correctAnswers, this.fb);
    this.form.controls.wrongAnswers.disable();
  }
  
  @Input({ required: true }) form = this.fb.group({
    prompt: ['', [Validators.required, Validators.maxLength(100)]],
    correctAnswers: this.fb.array([
      this.fb.group({ answer: ['', [Validators.required, Validators.maxLength(100)]] })
    ]),
    wrongAnswers: this.fb.array([
      this.fb.group({ answer: ['', [Validators.required, Validators.maxLength(100)]] })
    ]),
    type: [questionTypes.text]
  });
  
  answersManager!: AnswersManager;


  addField(event: Event) {
    event.preventDefault();
    this.answersManager.addField();
  }

  removeField(event: Event, index: number) {
    event.preventDefault();
    this.answersManager.removeFieldAt(index);    
  }
}
