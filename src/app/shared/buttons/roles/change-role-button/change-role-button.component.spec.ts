import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChangeRoleButtonComponent } from './change-role-button.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AdminService } from '../../../../features/admin-service/admin.service';
import { AppStoreModule } from '../../../../store/app-store.module';
import { Observable, of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { api } from '../../../../constants/api.constants';
import { HttpStatusCode } from '@angular/common/http';
import { IUserList } from '../../../../../types/responses/administration.types';
import { roles } from '../../../../constants/roles.constants';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

describe('ChangeRoleButtonComponent', () => {
  let component: ChangeRoleButtonComponent;
  let fixture: ComponentFixture<ChangeRoleButtonComponent>;
  let adminService: AdminService;
  let controller: HttpTestingController;
  let element: HTMLElement;

  const event = new Event('click');
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ChangeRoleButtonComponent,
        HttpClientTestingModule,
        AppStoreModule,
        RouterTestingModule,
        NoopAnimationsModule
      ],
      providers: [
        { 
          provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, 
          useValue: { duration: 0 }
        },
      ]
    });

    fixture = TestBed.createComponent(ChangeRoleButtonComponent);
    component = fixture.componentInstance;
    adminService = TestBed.inject(AdminService);
    controller = TestBed.inject(HttpTestingController);
    element = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Unit tests', () => {
    describe('changeRole', () => {
      it('Calls the correct service method based on properties', () => {
        spyOn(adminService, 'removeRoleFromUser')
          .and.returnValue(of({
            total: 0,
            users: []
          }));

        spyOn(adminService, 'addRoleToUser')
          .and.returnValue(of({
            total: 1,
            users: []
          }));

        component.userId = '1';

        component.userHasRole = true;
        component.role = roles.moderator;

        component.changeRole(event);

        expect(adminService.removeRoleFromUser).toHaveBeenCalledWith('1', roles.moderator);

        component.userHasRole = false;
        component.role = roles.moderator;
        component.changeRole(event);
        expect(adminService.addRoleToUser).toHaveBeenCalledWith('1', roles.moderator);
      });

      it('Emits updateUserEvent with the proper arguments when request is successful', () => {
        component.userHasRole = true;
        component.userId = '1';
        spyOn(adminService, 'removeRoleFromUser')
          .and.returnValue(of({
            total: 0,
            users: []
          }));

        spyOn(adminService, 'addRoleToUser')
          .and.returnValue(of({
            total: 1,
            users: []
          }));

        spyOn(component.updateUsersEvent, 'emit');

        component.changeRole(event);
        expect(component.updateUsersEvent.emit).toHaveBeenCalledWith(
          {
            total: 0,
            users: []
          }
        );

        component.userHasRole = false;
        component.changeRole(event);
        expect(component.updateUsersEvent.emit).toHaveBeenCalledWith(
          {
            total: 1,
            users: []
          }
        );

      });

      it('Does not emit updateUserEvent when the request is unsuccessful', () => {
        component.userHasRole = false;
        spyOn(adminService, 'addRoleToUser')
          .and.returnValue(new Observable(o => o.error('error')));

        spyOn(component.updateUsersEvent, 'emit').and.stub();

        component.changeRole(event);
        expect(component.updateUsersEvent.emit).not.toHaveBeenCalled();
      });
    });
  });

  describe('Component tests', () => {
    it('Sends a request when clicked and emits an update successfully', waitForAsync(() => {
      const response: IUserList = {
        total: 0,
        users: [],
      };

      component.userId = '1';
      component.userHasRole = false;
      component.role = roles.moderator;

      spyOn(component.updateUsersEvent, 'emit');

      fixture.detectChanges();
      const button = element.querySelector('.roles-btn') as HTMLButtonElement;

      button.click();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(component.updateUsersEvent.emit).toHaveBeenCalledWith(response);
      });

      const request = controller.expectOne(api.endpoints.roles.promote('1', 'Moderator'));

      request.flush(response, {
        status: HttpStatusCode.Ok,
        statusText: 'Ok',
      });
    }));
  });

  afterEach(() => {
    controller.verify();
  })
});
