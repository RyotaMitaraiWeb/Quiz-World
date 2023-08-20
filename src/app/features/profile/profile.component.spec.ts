import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AppStoreModule } from '../../store/app-store.module';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../../core/role-service/role.service';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppStore } from '../../../types/store/store.types';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { restartUser, setUser } from '../../store/user/user.action';
import { roles } from '../../constants/roles.constants';
import { IUserState } from '../../../types/store/user.types';
import { IProfile } from '../../../types/others/lists.types';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  let route: ActivatedRoute;
  let router: Router;
  let roleService: RoleService;
  let store: Store<IAppStore>;
  let element: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ProfileComponent,
        RouterTestingModule,
        AppStoreModule,
        HttpClientTestingModule,
        MatSnackBarModule
      ],
      providers: [
        { 
          provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, 
          useValue: { duration: 0 }, // or whatever duration you want
        },
      ]
    });
    fixture = TestBed.createComponent(ProfileComponent);

    route = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
    roleService = TestBed.inject(RoleService);
    store = TestBed.inject(Store);
    element = fixture.debugElement.nativeElement;

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component tests', () => {
    describe('Admin actions', () => {
      it('Displays admin actions based on the user state', () => {
        store.dispatch(setUser({
          id: '1',
          username: 'a',
          roles: [roles.moderator, roles.user]
        }));
        fixture.detectChanges();

        expect(element.querySelector('.admin-actions'))
          .withContext('Admin acitons should not be visible')
          .toBeNull();

        store.dispatch(setUser({
          id: '1',
          username: 'a',
          roles: [roles.admin, roles.moderator, roles.user],
        }));

        fixture.detectChanges();

        expect(element.querySelector('.admin-actions'))
          .withContext('Admin acitons should be visible')
          .not.toBeNull();
      });

      it('Displays the correct text for change role button if the viewed user is a moderator', () => {
        store.dispatch(setUser({
          id: '1',
          username: 'a',
          roles: [roles.admin, roles.moderator, roles.user]
        }));

        spyOn(component, 'getResolvedData').and.returnValue(
          of(
            {
              profile: {
                id: '1',
                username: 'a',
                roles: [roles.moderator, roles.user]
              } as IUserState
            }
          )
        );

        fixture.detectChanges();

        const button = element.querySelector('.roles-btn') as HTMLButtonElement;        
        expect(button.textContent?.includes('Demote')).toBeTrue();
      });

      it('Displays the correct text for change role button if the viewed user is not a moderator', () => {
        store.dispatch(setUser({
          id: '1',
          username: 'a',
          roles: [roles.admin, roles.moderator, roles.user]
        }));

        spyOn(component, 'getResolvedData').and.returnValue(
          of(
            {
              profile: {
                id: '1',
                username: 'a',
                roles: [roles.user]
              } as IUserState
            }
          )
        );

        fixture.detectChanges();

        const button = element.querySelector('.roles-btn') as HTMLButtonElement;
        
        expect(button.textContent?.includes('Promote')).toBeTrue();
      });
    });

    describe('General area', () => {
      it('Displays correct username and link based on the viewed user\'s data', () => {
        spyOn(component, 'getResolvedData').and.returnValue(
          of({
            profile: {
              id: '1a',
              username: 'a',
              roles: [roles.moderator]
            } as IUserState,
          })
        );

        fixture.detectChanges();

        const username = element.querySelector('.username');
        expect(username?.textContent).toBe('a\'s profile');

        const link = element.querySelector('.user-quizzes-link') as HTMLAnchorElement;
        expect(link.href.endsWith('/1a')).toBeTrue();
      });
    });
  });
});
