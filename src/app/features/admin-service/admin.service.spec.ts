import { TestBed } from '@angular/core/testing';

import { AdminService } from './admin.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppStoreModule } from '../../store/app-store.module';
import { ILogsList, IUser, IUserList, IUserResponse } from '../../../types/responses/administration.types';
import { roles } from '../../constants/roles.constants';
import { HttpStatusCode } from '@angular/common/http';
import { ILogActivity } from '../../../types/administration/logs.types';

describe('AdminService', () => {
  let service: AdminService;
  let testController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AppStoreModule]
    });
    service = TestBed.inject(AdminService);
    testController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUsersOfRole', () => {
    it('Sends the proper request based on arguments', (done: DoneFn) => {
      service.getUsersOfRole('Moderator', 3, 'desc').subscribe({
        next: res => {
          expect(res.users.length).toBe(2);
          expect(res.users[0].id).toBe('1');
          expect(res.users[0].roles).toEqual([roles.user]);

          expect(res.users[1].roles).toEqual([roles.admin, roles.moderator]);
          done();
        },
        error: err => {
          done.fail('Expected a successful response, not an error one');
          console.warn(err);
        }
      })
      const request = testController.expectOne(service.rolesUrl.getUsersOfRole(roles.moderator) + '?page=3&order=desc');
      request.flush({
        total: 10,
        users: [
          {
            id: '1',
            username: 'a',
            roles: [roles.user],
          },
          {
            id: '2',
            username: 'b',
            roles: [roles.admin, roles.moderator],
          }
        ]
      } as IUserList, {
        status: HttpStatusCode.Ok,
        statusText: 'Ok'
      });
    });
  });

  describe('getUsersByUsername', () => {
    it('Returns a list of users', (done: DoneFn) => {
      service.getUsersByUsername('a').subscribe({
        next: res => {
          expect(res.users.length).toBe(2);
          expect(res.users[0].roles).toEqual([roles.user]);
          expect(res.users[1].roles).toEqual([roles.admin, roles.moderator]);
          done();
        },
        error: err => {
          done.fail('Expected a successful response, not an error one');
          console.warn(err);
        },
      });

      const request = testController.expectOne(`${service.rolesUrl.getUsersOfUsername()}?username=a`);
      request.flush({
        total: 10,
        users: [
          {
            id: '1',
            username: 'a',
            roles: [roles.user],
          },
          {
            id: '2',
            username: 'aa',
            roles: [roles.admin, roles.moderator],
          },
        ]
      } as IUserList,
        {
          status: HttpStatusCode.Ok,
          statusText: 'Ok',
        }
      );
    });

    it('Attaches correct parameters based on page and sort arguments', (done: DoneFn) => {
      service.getUsersByUsername('a', 2, 'desc').subscribe({
        next: res => {
          expect(res).toBeTruthy();
          done();
        },
        error: err => {
          done.fail('Expected a successful response, not an error one');
          console.warn(err);
        },
      });

      const request = testController.expectOne(req => {
        const params = req.params;
        const page = params.get('page');
        const order = params.get('order');

        return page === '2' && order === 'desc';
      });

      request.flush({
        total: 10,
        users: [
          {
            id: '2',
            username: 'ba',
            roles: [roles.user],
          },
          {
            id: '1',
            username: 'aa',
            roles: [roles.moderator],
          },
        ]
      } as IUserList,
        {
          status: HttpStatusCode.Ok,
          statusText: 'Ok',
        }
      );
    });
  });

  describe('addRoleToUser', () => {
    it('Sends the proper request based on arguments', (done: DoneFn) => {
      service.addRoleToUser('1', 'Moderator').subscribe({
        next: res => {
          expect(res.users.length).toBe(2);
          expect(res.users[0].id).toBe('1');
          expect(res.users[0].roles).toEqual([roles.user]);

          expect(res.users[1].roles).toEqual([roles.admin, roles.moderator]);
          done();
        },
        error: err => {
          done.fail('Expected a successful response, not an error one');
          console.warn(err);
        }
      });

      const request = testController.expectOne(service.rolesUrl.promote('1', roles.moderator));
      request.flush({
        total: 10,
        users: [
          {
            id: '1',
            username: 'a',
            roles: [roles.user],
          },
          {
            id: '2',
            username: 'b',
            roles: [roles.admin, roles.moderator],
          }
        ]
      } as IUserList, {
        status: HttpStatusCode.Ok,
        statusText: 'Ok'
      });
    });
  });

  describe('removeRoleFromUser', () => {
    it('Sends the proper request based on arguments', (done: DoneFn) => {
      service.removeRoleFromUser('1', 'Moderator').subscribe({
        next: res => {
          expect(res.users.length).toBe(2);
          expect(res.users[0].id).toBe('1');
          expect(res.users[0].roles).toEqual([roles.user]);

          expect(res.users[1].roles).toEqual([roles.admin, roles.moderator]);
          done();
        },
        error: err => {
          done.fail('Expected a successful response, not an error one');
          console.warn(err);
        }
      });
      
      const request = testController.expectOne(service.rolesUrl.demote('1', roles.moderator));
      request.flush({
        total: 10,
        users: [
          {
            id: '1',
            username: 'a',
            roles: [roles.user],
          },
          {
            id: '2',
            username: 'b',
            roles: [roles.admin, roles.moderator],
          }
        ]
      } as IUserList, {
        status: HttpStatusCode.Ok,
        statusText: 'Ok'
      });
    });
  });

  describe('getActivityLogs', () => {
    it('Retrieves a list of logs', (done: DoneFn) => {
      service.getActivityLogs().subscribe({
        next: res => {
          expect(res.logs.length).toBe(1);
          expect(res.logs[0].message).toBe('a');
          done();
        },
        error: err => {
          console.warn(err);
          done.fail('Expected a successful response, not an error one');
        },
      });

      const request = testController.expectOne(service.logsUrl.getLogs);
      request.flush(
        {
          total: 10,
          logs: [
            {
              message: 'a',
              date: Date.now().toString(),
            },
          ]
        } as ILogsList,
        {
          status: HttpStatusCode.Ok,
          statusText: 'Ok',
        },
      );
    });

    it('Attaches query parameters successfully', (done: DoneFn) => {
      service.getActivityLogs(2, 'desc').subscribe({
        next: res => {
          expect(res).toBeTruthy();
          done();
        },
        error: err => {
          console.warn(err);
          done.fail('Expected a successful response, not an error one');
        },
      });

      const request = testController.expectOne(req => {
        const params = req.params;
        const page = params.get('page');
        const order = params.get('order');

        return page === '2' && order === 'desc';
      });

      request.flush([], {
        status: HttpStatusCode.Ok,
        statusText: 'Ok',
      });
    });
  });

  afterEach(() => {
    testController.verify();
  });
});
