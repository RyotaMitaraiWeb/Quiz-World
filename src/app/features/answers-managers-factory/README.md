# AnswersManagersFactory
An injectable service that generates stateful answer managers.

## Methods
```typescript
function createManager(manager: 'single', form: FormArray<FormGroup<{
    value: FormControl<string | null>;
    correct: FormControl<boolean | null>;
  }>>): SingleChoiceAnswersManager;

function createManager(manager: 'multi', form: FormArray<FormGroup<{
    value: FormControl<string | null>;
    correct: FormControl<boolean | null>;
  }>>): MultipleChoiceAnswersManager;

function createManager(manager: 'text', form: FormArray<FormGroup<{
    value: FormControl<string | null>;
    correct: FormControl<boolean | null>;
  }>>): TextAnswersManager;
```
Creates an instance of an answer manager class based on the provided ``manager`` argument. The current managers available are ``SingleChoiceAnswersManager``, ``MultipleChoiceAnswersManager``, and ``TextAnswersManager``. The provided ``form`` is the form array of the given question that the instance of the manager will manipulate.