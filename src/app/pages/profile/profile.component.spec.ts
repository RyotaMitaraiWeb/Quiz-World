import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { provideRouter } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileComponent, NoopAnimationsModule],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('username', 'a');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
