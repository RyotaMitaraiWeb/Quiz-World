import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appQuestionGrade]',
  standalone: true,
})
export class QuestionGradeDirective implements OnChanges {

  @Input() appQuestionGrade!: boolean | null;
  constructor(private el: ElementRef) {}

  ngOnChanges() {
    this.grade();
  }

  private grade() {
    if (this.appQuestionGrade) {
      this.el.nativeElement.classList.add('correct');
      this.el.nativeElement.classList.remove('incorrect');
    } else if (this.appQuestionGrade === false) {
      this.el.nativeElement.classList.add('incorrect');
      this.el.nativeElement.classList.remove('correct');
    }
  }
}
