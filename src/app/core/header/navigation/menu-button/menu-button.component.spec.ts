import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuButtonComponent } from './menu-button.component';
import { AppStoreModule } from '../../../../store/app-store.module';
import { Store } from '@ngrx/store';
import { IAppStore } from '../../../../../types/store/store.types';
import { closeMenu, openMenu } from '../../../../store/menu/menu.action';

describe('MenuButtonComponent', () => {
  let component: MenuButtonComponent;
  let fixture: ComponentFixture<MenuButtonComponent>;
  let store: Store<IAppStore>;
  const event = new Event('click');
  let element: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MenuButtonComponent, AppStoreModule]
    });
    fixture = TestBed.createComponent(MenuButtonComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    element = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Unit tests', () => {
    beforeEach(() => {
      spyOn(store, 'select').and.stub();
      spyOn(store, 'dispatch').and.stub();
    });

    describe('toggle', () => {
      it('Dispatches correct action based on the open property', () => {
        component.open = false;
        component.toggle(event);
        expect(store.dispatch).toHaveBeenCalledWith(openMenu());

        component.open = true;
        component.toggle(event);
        expect(store.dispatch).toHaveBeenCalledWith(closeMenu());
      });
    });
  });

  describe('Integration tests', () => {
    describe('ngOnInit', () => {
      it('links the open property to the store successfully', () => {
        store.dispatch(closeMenu());
        component.ngOnInit();

        expect(component.open).toBeFalse();

        store.dispatch(openMenu());
        expect(component.open).toBeTrue();
      });
    });

    describe('toggle', () => {
      it('toggles the open state successfully', (done: DoneFn) => {
        store.dispatch(closeMenu());
        component.ngOnInit();

        component.toggle(event);
        store.select(store => store.menu.open).subscribe(open => {
          expect(open).toBeTrue();
          done();
        });
      });
    });
  });

  describe('Component tests', () => {
    it('Button is disabled when open is true', () => {
      component.open = true;
      fixture.detectChanges();

      const btn = element.querySelector('.menu-btn') as HTMLButtonElement;
      expect(btn.disabled).toBeTrue();
    });

    it('Toggles the menu state when clicked', (done: DoneFn) => {
      store.dispatch(closeMenu());
      component.ngOnInit();

      fixture.detectChanges();

      const btn = element.querySelector('.menu-btn') as HTMLButtonElement;
      expect(btn.disabled)
        .withContext('Button should be clickable and not disabled or null')
        .toBeFalse();

      btn.click();
      fixture.detectChanges();

      expect(btn.disabled).toBeTrue();
      store.select(store => store.menu.open).subscribe(open => {
        expect(open).toBeTrue();
        done();
      });
    });
  });
});
