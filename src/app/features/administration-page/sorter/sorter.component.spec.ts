import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SorterComponent } from './sorter.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SorterComponent', () => {
  let component: SorterComponent;
  let fixture: ComponentFixture<SorterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SorterComponent, NoopAnimationsModule]
    });
    fixture = TestBed.createComponent(SorterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
