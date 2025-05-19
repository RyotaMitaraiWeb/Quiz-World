import { Directive, ElementRef, inject, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appFocusNewlyAddedField]',
})
export class FocusNewlyAddedFieldDirective implements AfterViewInit {
  private readonly element = inject(ElementRef<HTMLTextAreaElement | HTMLInputElement>);

  ngAfterViewInit() {
    this.element.nativeElement.focus();
  }
}
