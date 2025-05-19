import { computed, Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  private _open = signal(false);
  readonly isOpen = computed(() => this._open());

  private _afterClosed$ = new Subject<void>();
  readonly afterClosed = this._afterClosed$.asObservable();

  open() {
    this._open.set(true);
  }

  close() {
    const wasOpen = this.isOpen();
    this._open.set(false);
    if (wasOpen) {
      this._afterClosed$.next();
    }
  }

  toggle() {
    this._open.update(o => !o);

    if (!this.isOpen()) {
      this._afterClosed$.next();
    }
  }
}
