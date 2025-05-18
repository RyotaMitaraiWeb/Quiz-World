import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPageComponent } from './all-page.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('AllPageComponent', () => {
  let component: AllPageComponent;
  let fixture: ComponentFixture<AllPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllPageComponent, NoopAnimationsModule],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
