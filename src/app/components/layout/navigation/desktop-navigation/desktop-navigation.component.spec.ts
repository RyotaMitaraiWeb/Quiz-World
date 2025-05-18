import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopNavigationComponent } from './desktop-navigation.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { MatInputHarness } from '@angular/material/input/testing';

describe('DesktopNavigationComponent', () => {
  let component: DesktopNavigationComponent;
  let fixture: ComponentFixture<DesktopNavigationComponent>;
  let loader: HarnessLoader;
  let router: Router;

  function retrieveFieldState() {
    return {
      closed: document.querySelector('.closed'),
      open: document.querySelector('.open'),
    };
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesktopNavigationComponent, NoopAnimationsModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesktopNavigationComponent);
    router = TestBed.inject(Router);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Search', () => {
    it('Performs a search successfully (integration test)', async () => {
      const buttons = await loader.getAllHarnesses(MatButtonHarness);
      const [, searchButton, searchMenuButton] = buttons;
      const spy = spyOn(router, 'navigate').and.stub();

      await searchMenuButton.click();

      fixture.detectChanges();

      const afterOpenState = retrieveFieldState();
      expect(afterOpenState.open).not.toBeNull();
      expect(afterOpenState.closed).toBeNull();

      const field = await loader.getHarness(MatInputHarness);

      await field.setValue('a');
      fixture.detectChanges();

      await searchButton.click();

      expect(spy).toHaveBeenCalledWith(['quiz', 'search'], { queryParams: { query: 'a' }});

      await searchMenuButton.click();

      fixture.detectChanges();

      const afterCloseState = retrieveFieldState();
      expect(afterCloseState.open).toBeNull();
      expect(afterCloseState.closed).not.toBeNull();
    });
  });
});
