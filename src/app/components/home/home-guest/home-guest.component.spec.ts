import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGuestComponent } from './home-guest.component';
import { provideRouter } from '@angular/router';

describe('HomeGuestComponent', () => {
  let component: HomeGuestComponent;
  let fixture: ComponentFixture<HomeGuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeGuestComponent],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
