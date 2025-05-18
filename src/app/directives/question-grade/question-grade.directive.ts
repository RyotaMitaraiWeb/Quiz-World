import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

/**
 * Directive for applying class names based on "feedback". Essentially,
 * the directive applies one class name for "correct" answers and one for "wrong"
 * answers. Pass ``null`` to the directive to indicate that there is no feedback
 * (yet).
 */
@Directive({
  selector: '[appQuestionGrade]',
  standalone: true,
})
export class QuestionGradeDirective implements OnChanges {

  @Input() appQuestionGrade!: boolean | null;

  @Input() correctAnswerClassName = 'correct';
  @Input() incorrectAnswerClassName = 'incorrect';
  constructor(private el: ElementRef) {}

  ngOnChanges() {
    this.grade();
  }

  private grade() {
    if (this.appQuestionGrade) {
      this.el.nativeElement.classList.add(this.correctAnswerClassName);
      this.el.nativeElement.classList.remove(this.incorrectAnswerClassName);
    } else if (this.appQuestionGrade === false) {
      this.el.nativeElement.classList.add(this.incorrectAnswerClassName);
      this.el.nativeElement.classList.remove(this.correctAnswerClassName);
    }
  }
}
