import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationComponent } from './navigation.component';
import { AppStoreModule } from '../../../store/app-store.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { IAppStore } from '../../../../types/store/store.types';
import { restartUser, setUser } from '../../../store/user/user.action';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let store: Store<IAppStore>;

  describe('Component tests', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NavigationComponent, AppStoreModule, RouterTestingModule, HttpClientTestingModule],
      });
      fixture = TestBed.createComponent(NavigationComponent);
      component = fixture.componentInstance;
      store = TestBed.inject(Store<IAppStore>);
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    describe('Links', () => {
      it('Correctly displays links for guests', () => {
        store.dispatch(restartUser());
        const guestLinks = document.querySelectorAll('.guest');
        expect(guestLinks.length).toBe(2);
      });

      it('Correctly displays links for logged in users', () => {
        store.dispatch(setUser({ id: '1', username: 'admin', roles: ['User'] }));
        fixture.detectChanges();

        const adminLinks = document.querySelectorAll('.user');
        expect(adminLinks.length).toBe(2);
      });
    });

    describe('Media screen', () => {
      it('Does not render if viewport is <= 500px', () => {
        spyOn(component, 'getInnerWidth').and.returnValue(500);
        fixture.detectChanges();
        const nav = document.querySelector('#nav');

        expect(nav).toBeNull();
      });

      it('Renders if viewport is > 500px', () => {
        spyOn(component, 'getInnerWidth').and.returnValue(501);
        fixture.detectChanges();
        const nav = document.querySelector('#nav');

        expect(nav).toBeTruthy();
      });
    });
  });
});
