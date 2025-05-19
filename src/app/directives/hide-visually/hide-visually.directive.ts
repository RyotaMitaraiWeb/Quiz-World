import { booleanAttribute, Directive, ElementRef, inject, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHideVisually]',
})
export class HideVisuallyDirective implements OnChanges {
  private readonly element = inject(ElementRef<HTMLElement>);

  @Input({ required: true, transform: booleanAttribute })
  appHideVisually = true;

  ngOnChanges(changes: SimpleChanges): void {
    const shouldHide: boolean = changes['appHideVisually'].currentValue;
    this.toggleHide(shouldHide);
  }

  private toggleHide(shouldHide: boolean) {
    if (shouldHide) {
      this.element.nativeElement.classList.add('invisible');
    } else {
      this.element.nativeElement.classList.remove('invisible');
    }
  }
}
