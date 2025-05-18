import { Component } from '@angular/core';
import { QuestionGradeDirective } from '../question-grade.directive';

@Component({
  selector: 'app-test',
  imports: [QuestionGradeDirective],
  templateUrl: './test.component.html',
})
export class TestComponent {}
