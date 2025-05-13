import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSearchFieldDialogComponent } from './mobile-search-field-dialog.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MobileSearchFieldDialogComponent', () => {
  let component: MobileSearchFieldDialogComponent;
  let fixture: ComponentFixture<MobileSearchFieldDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileSearchFieldDialogComponent, NoopAnimationsModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileSearchFieldDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
