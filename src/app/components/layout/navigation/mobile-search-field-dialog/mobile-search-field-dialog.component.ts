import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MobileSearchFieldComponent } from '../mobile-search-field/mobile-search-field.component';
import { filter, Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-mobile-search-field-dialog',
  imports: [
    MatDialogModule,
    MobileSearchFieldComponent,
  ],
  templateUrl: './mobile-search-field-dialog.component.html',
  styleUrl: './mobile-search-field-dialog.component.scss',
})
export class MobileSearchFieldDialogComponent implements OnInit, OnDestroy {
  private readonly route = inject(Router);
  private readonly dialogRef = inject(MatDialogRef<MobileSearchFieldDialogComponent>);

  ngOnInit() {
    this._routerEventsSub = this.route.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
      )
      .subscribe(() => {
      this.dialogRef.close();
    });
  }

  private _routerEventsSub?: Subscription;

  ngOnDestroy() {
    this._routerEventsSub?.unsubscribe();
  }
}
