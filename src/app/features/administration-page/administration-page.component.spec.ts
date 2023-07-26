import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationPageComponent } from './administration-page.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AdministrationPageComponent', () => {
  let component: AdministrationPageComponent;
  let fixture: ComponentFixture<AdministrationPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AdministrationPageComponent, NoopAnimationsModule]
    });
    fixture = TestBed.createComponent(AdministrationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
