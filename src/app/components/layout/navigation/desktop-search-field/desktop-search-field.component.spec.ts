import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopSearchFieldComponent } from './desktop-search-field.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatButtonHarness } from '@angular/material/button/testing';

describe('DesktopSearchFieldComponent', () => {
  let component: DesktopSearchFieldComponent;
  let fixture: ComponentFixture<DesktopSearchFieldComponent>;
  let loader: HarnessLoader;

  function retrieveFieldState() {
    return {
      closed: document.querySelector('.closed'),
      open: document.querySelector('.open'),
    };
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesktopSearchFieldComponent, NoopAnimationsModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesktopSearchFieldComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('toggles states correctly depending on input', () => {
    const initialMenuState = retrieveFieldState();

    expect(initialMenuState.closed).not.toBeNull();
    expect(initialMenuState.open).toBe(null);

    fixture.componentRef.setInput('open', true);
    fixture.detectChanges();

    const currentState = retrieveFieldState();
    expect(currentState.closed).toBeNull();
    expect(currentState.open).not.toBe(null);

    fixture.componentRef.setInput('open', false);
    fixture.detectChanges();

    const afterToggleState = retrieveFieldState();
    expect(afterToggleState.closed).not.toBeNull();
    expect(afterToggleState.open).toBe(null);
  });

  it('Toggles button\'s disabled status depending on whether a value is inputted', async () => {
    const field = await loader.getHarness(MatInputHarness);
    const submitButton = await loader.getHarness(MatButtonHarness);
    expect(await submitButton.isDisabled()).toBeTrue();

    await field.setValue('a');
    expect(await submitButton.isDisabled()).toBeFalse();

    await field.setValue('');
    expect(await submitButton.isDisabled()).toBeTrue();
  });
});
