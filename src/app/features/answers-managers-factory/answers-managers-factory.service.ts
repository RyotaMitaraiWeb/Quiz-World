import { Injectable } from '@angular/core';
import { SingleChoiceAnswersManager } from '../../util/AnswersManager/managers/SingleChoice/SingleChoiceAnswersManager';
import { MultipleChoiceAnswersManager } from '../../util/AnswersManager/managers/MultipleChoice/MultipleChoiceAnswersManager';
import { TextAnswersManager } from '../../util/AnswersManager/managers/Text/TextAnswersManager';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

type managerTypes = SingleChoiceAnswersManager | MultipleChoiceAnswersManager | TextAnswersManager;

@Injectable({
  providedIn: 'root'
})
export class AnswersManagersFactoryService {
  constructor(private readonly fb: FormBuilder) { }

  private readonly managers = {
    'single': SingleChoiceAnswersManager,
    'multi': MultipleChoiceAnswersManager,
    'text': TextAnswersManager,
  }

  createManager(manager: 'single', form: FormArray<FormGroup<{
    value: FormControl<string | null>;
    correct: FormControl<boolean | null>;
  }>>): SingleChoiceAnswersManager;
  createManager(manager: 'multi', form: FormArray<FormGroup<{
    value: FormControl<string | null>;
    correct: FormControl<boolean | null>;
  }>>): MultipleChoiceAnswersManager;
  createManager(manager: 'text', form: FormArray<FormGroup<{
    value: FormControl<string | null>;
    correct: FormControl<boolean | null>;
  }>>): TextAnswersManager;
  createManager(manager: 'single' | 'multi' | 'text', form: FormArray<FormGroup<{
    value: FormControl<string | null>;
    correct: FormControl<boolean | null>;
  }>>): managerTypes {
    const managerClass = this.managers[manager];
    if (!managerClass) {
      throw new Error('Argument "manager" is not a valid value!');
    }

    return new managerClass(this.fb, form);
  }
}
