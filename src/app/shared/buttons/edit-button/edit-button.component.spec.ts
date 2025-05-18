import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditButtonComponent } from './edit-button.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('EditButtonComponent', () => {
  let component: EditButtonComponent;
  let fixture: ComponentFixture<EditButtonComponent>;
  let router: Router;
  let element: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        EditButtonComponent,
        RouterTestingModule,
        MatSnackBarModule
      ]
    });
    fixture = TestBed.createComponent(EditButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
    element = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
