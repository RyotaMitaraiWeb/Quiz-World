import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';

import { OverlayMenuComponent } from './overlay-menu.component';
import { AppStoreModule } from '../../store/app-store.module';
import { Store } from '@ngrx/store';
import { IAppStore } from '../../../types/store/store.types';
import { closeMenu, openMenu } from '../../store/menu/menu.action';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { setUser } from '../../store/user/user.action';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('OverlayMenuComponent', () => {
  let component: OverlayMenuComponent;
  let fixture: ComponentFixture<OverlayMenuComponent>;
  let store: Store<IAppStore>;
  let element: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        OverlayMenuComponent,
        AppStoreModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ]
    });
    fixture = TestBed.createComponent(OverlayMenuComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    element = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Unit tests', () => {
    describe('Close menu', () => {
      it('Dispatches an action when called', fakeAsync(() => {
        spyOn(store, 'dispatch').and.stub();

        component.closeMenu();
        tick(500);
        expect(store.dispatch).toHaveBeenCalledWith(closeMenu());
      }));
    });
  });

  describe('Integration tests', () => {
    describe('closeMenu', () => {
      it('Sets the open state to false when called', fakeAsync(() => {
        store.dispatch(openMenu());

        component.closeMenu();
        tick(500);
        store.select(store => store.menu.open).subscribe(open => {
          expect(open).toBeFalse();
        })
      }));
    });
  });

  describe('Component tests', () => {
    it('Closes the menu when the overlay area is clicked', fakeAsync(() => {
      store.dispatch(openMenu());
      fixture.detectChanges();

      const overlay = element.querySelector('.leftover-space')!;
      overlay.dispatchEvent(new Event('click'));

      tick(500);

      fixture.detectChanges();

      expect(element.querySelector('nav')).toBeNull();
    }));

    it('Displays proper links based on the user\'s roles', fakeAsync(() => {
      store.dispatch(openMenu());
      fixture.detectChanges();

      store.dispatch(setUser({
        id: '',
        username: '',
        roles: [],
      }));
      fixture.detectChanges();

      const items = element.querySelectorAll('.navigation-item');
      expect(items.length)
        .withContext('Navigation items for guest')
        .toBe(4);

      const guestItems = element.querySelectorAll('.guest');
      expect(guestItems.length)
        .withContext('Items shown only to guests')
        .toBe(2);

      store.dispatch(setUser({
        id: '1',
        username: 'a',
        roles: ['User'],
      }));

      fixture.detectChanges();

      const items2 = element.querySelectorAll('.navigation-item');
      expect(items2.length)
        .withContext('Navigation items shown to a logged in user')
        .toBe(4);

      const userItems = element.querySelectorAll('.user');
      expect(userItems.length)
        .withContext('Items shown only to logged in users')
        .toBe(2);

      store.dispatch(setUser({
        id: '1',
        username: 'a',
        roles: ['Administrator'],
      }));
      fixture.detectChanges();

      const items3 = element.querySelectorAll('.navigation-item');
      expect(items3.length).toBe(5);

      const adminItems = element.querySelectorAll('.admin');
      expect(adminItems.length)
        .withContext('Items shown only to logged admins')
        .toBe(1);
    }));
  });
});
