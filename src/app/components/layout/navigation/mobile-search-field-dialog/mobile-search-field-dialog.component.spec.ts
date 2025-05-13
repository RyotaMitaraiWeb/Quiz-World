import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { MobileSearchFieldDialogComponent } from './mobile-search-field-dialog.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

describe('MobileSearchFieldDialogComponent', () => {
  let component: MobileSearchFieldDialogComponent;
  let fixture: ComponentFixture<MobileSearchFieldDialogComponent>;
  let routerEventsSubject: Subject<unknown>;
  const dialogRef = { close() {
    //
  }};

  beforeEach(async () => {
    routerEventsSubject = new Subject<unknown>();
    const routerMock = {
      events: routerEventsSubject.asObservable(),
    };

    await TestBed.configureTestingModule({
      imports: [MobileSearchFieldDialogComponent, NoopAnimationsModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: dialogRef,
        },
        {
          provide: Router,
          useValue: routerMock,
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileSearchFieldDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Closes when a NavigationEnd event occurs', () => {
    const navigationEndEvent = new NavigationEnd(1, '/previous', '/current');
    const spy = spyOn(dialogRef, 'close').and.stub();
    routerEventsSubject.next(navigationEndEvent);

    expect(spy).toHaveBeenCalled();
  });
});
