import { Directive, ElementRef, inject, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SidenavService } from '../../services/sidenav/sidenav.service';

@Directive({
  selector: '[appReturnFocusOnSidenavClose]',
})
export class ReturnFocusOnSidenavCloseDirective implements AfterViewInit, OnDestroy {
  private readonly element = inject(ElementRef);
  private readonly sidenav = inject(SidenavService);

  ngAfterViewInit() {
    this._afterCloseSub = this.sidenav.afterClosed.subscribe(() => {
      const nativeElement = this.element.nativeElement;
      if (typeof nativeElement['focus'] === 'function') {
        nativeElement.focus();
      }
    });
  }

  ngOnDestroy() {
    this._afterCloseSub?.unsubscribe();
  }

  private _afterCloseSub?: Subscription;

}
