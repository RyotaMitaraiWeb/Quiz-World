import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationComponent } from './navigation.component';
import { AppStoreModule } from '../../../store/app-store.module';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { IAppStore } from '../../../../types/store/store.types';
import { restartUser, setUser } from '../../../store/user/user.action';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let store: Store<IAppStore>;

  describe('Unit tests', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NavigationComponent, AppStoreModule, RouterTestingModule],
      });
      
      fixture = TestBed.createComponent(NavigationComponent);
      component = fixture.componentInstance;
      store = TestBed.inject(Store<IAppStore>);
      fixture.detectChanges();
    });

    describe('isGuest', () => {
      it('Returns true if the userRoles array is empty', () => {
        component.userRoles = [];
        const result = component.isGuest;
        expect(result).toBe(true);
      });

      it('Returns false if the userRoles array is not empty', () => {
        component.userRoles = ['User'];
        const result = component.isGuest;
        expect(result).toBe(false);
      });
    });
  });

  describe('Integration tests', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NavigationComponent, AppStoreModule, RouterTestingModule],
      });
      
      fixture = TestBed.createComponent(NavigationComponent);
      component = fixture.componentInstance;
      store = TestBed.inject(Store<IAppStore>);
      fixture.detectChanges();
    });

    describe('isGuest', () => {
      it('Correctly tracks the user state', () => {
        expect(component.isGuest).toBe(true);

        store.dispatch(setUser({ id: 1, username: 'some username', roles: ['User']}));

        expect(component.isGuest).toBe(false);

        store.dispatch(restartUser());

        expect(component.isGuest).toBe(true)
      });
    });
  });

  describe('Component tests', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NavigationComponent, AppStoreModule, RouterTestingModule],
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
        store.dispatch(setUser({ id: 1, username: 'admin', roles: ['User']}));
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
