import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLoggedInComponent } from './home-logged-in.component';
import { provideRouter } from '@angular/router';

describe('HomeLoggedInComponent', () => {
  let component: HomeLoggedInComponent;
  let fixture: ComponentFixture<HomeLoggedInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeLoggedInComponent],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeLoggedInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
