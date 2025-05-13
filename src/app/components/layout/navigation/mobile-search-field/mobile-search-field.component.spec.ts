import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSearchFieldComponent } from './mobile-search-field.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MobileSearchFieldComponent', () => {
  let component: MobileSearchFieldComponent;
  let fixture: ComponentFixture<MobileSearchFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileSearchFieldComponent, NoopAnimationsModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileSearchFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
