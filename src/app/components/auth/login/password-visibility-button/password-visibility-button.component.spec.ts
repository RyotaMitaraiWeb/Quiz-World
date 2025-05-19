import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordVisibilityButtonComponent } from './password-visibility-button.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';

describe('PasswordVisibilityButtonComponent', () => {
  let component: PasswordVisibilityButtonComponent;
  let fixture: ComponentFixture<PasswordVisibilityButtonComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordVisibilityButtonComponent, NoopAnimationsModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordVisibilityButtonComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Toggles state correctly when clicked', async () => {
    const button = await loader.getHarness(MatButtonHarness);
    expect(component.passwordIsVisible()).toBeFalse();

    // Make sure that the aria-label also reflects the state
    const ariaLabelButton = document.querySelector('button');
    expect(ariaLabelButton?.ariaLabel).toBe('Show password');

    await button.click();
    await fixture.whenStable();

    expect(component.passwordIsVisible()).toBeTrue();
    expect(ariaLabelButton?.ariaLabel).toBe('Hide password');
  });
});
