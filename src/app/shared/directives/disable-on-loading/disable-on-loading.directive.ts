import { Directive, ElementRef, HostBinding, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { LoadingService } from 'src/app/core/loading/loading.service';

@Directive({
  selector: '[disableOnLoading]',
  standalone: true,
})
export class DisableOnLoadingDirective implements OnInit, OnDestroy {
  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private readonly loadingService: LoadingService
  ) {}

  private loadingSub = new Subscription();

  ngOnInit(): void {    
    this.loadingSub = this.loadingService.noRequests$.subscribe(loading => {
      this.el.nativeElement.disabled = !loading;
    });
  }

  ngOnDestroy() {
    this.loadingSub.unsubscribe();
  }
}
