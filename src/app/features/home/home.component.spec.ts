import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { AppStoreModule } from '../../store/app-store.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { IAppStore } from '../../../types/store/store.types';
import { restartUser, setUser } from '../../store/user/user.action';
import { roles } from '../../constants/roles.constants';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let element: HTMLElement;
  let store: Store<IAppStore>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HomeComponent, AppStoreModule, RouterTestingModule]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement.nativeElement;
    store = TestBed.inject(Store);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component tests', () => {
    describe('Display', () => {
      it('Displays correct section based on the user\'s status', () => {
        store.dispatch(restartUser());
        fixture.detectChanges();

        const guest = element.querySelector('.guest');
        expect(guest).not.toBeNull();

        store.dispatch(setUser({
          id: '1',
          username: 'a',
          roles: [roles.user]
        }));
        fixture.detectChanges();

        const user = element.querySelector('.logged-in');
        expect(user).not.toBeNull();
      });

      it('Displays correct username', () => {
        store.dispatch(setUser({
          id: '1',
          username: 'a',
          roles: [roles.user]
        }));
        fixture.detectChanges();

        const h2 = element.querySelector('.welcome');
        expect(h2?.textContent).toBe('Welcome, a!');
      });

      it('Displays correct profile', () => {
        store.dispatch(setUser({
          id: '1a',
          username: 'a',
          roles: [roles.user]
        }));
        fixture.detectChanges();

        const profile = element.querySelector('.profile') as HTMLAnchorElement;
        expect(profile.href.endsWith('/1a')).toBeTrue();
      });
    });
  });
});
