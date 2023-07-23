import { TestBed } from '@angular/core/testing';

import { AdminService } from './admin.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppStoreModule } from '../../store/app-store.module';
import { IUser, IUserResponse } from '../../../types/responses/administration.types';
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

  describe('getModerators', () => {
    it('Returns an array of users and maps all roles to the highest one', (done: DoneFn) => {
      service.getModerators().subscribe({
        next: res => {
          expect(res.length).toBe(2);
          expect(res[0].id).toBe(1);
          expect(res[0].role).toBe(roles.moderator);

          expect(res[1].role).toBe(roles.admin);
          done();
        },
        error: err => {
          done.fail('Expected a successful response, not an error one');
          console.warn(err);
        }
      })
      const request = testController.expectOne(service.rolesUrl.getUsersOfRole(roles.moderator));
      request.flush([
        {
          id: 1,
          username: 'a',
          roles: [roles.moderator, roles.user],
        },
        {
          id: 2,
          username: 'b',
          roles: [roles.moderator, roles.user, roles.admin]
        }
      ] as IUserResponse[], {
        status: HttpStatusCode.Ok,
        statusText: 'Ok'
      })
    });
  });

  describe('getAdmins', () => {
    it('Returns an array of users and maps all roles to the highest one', (done: DoneFn) => {
      service.getAdmins().subscribe({
        next: res => {
          expect(res.length).toBe(1);
          expect(res[0].id).toBe(1);
          expect(res[0].role).toBe(roles.admin);

          done();
        },
        error: err => {
          done.fail('Expected a successful response, not an error one');
          console.warn(err);
        },
      })
      const request = testController.expectOne(service.rolesUrl.getUsersOfRole(roles.admin));
      request.flush([
        {
          id: 1,
          username: 'a',
          roles: [roles.moderator, roles.user, roles.admin],
        },

      ] as IUserResponse[], {
        status: HttpStatusCode.Ok,
        statusText: 'Ok'
      });
    });
  });

  describe('getUsersByUsername', () => {
    it('Returns a list of users', (done: DoneFn) => {
      service.getUsersByUsername('a').subscribe({
        next: res => {
          expect(res.length).toBe(2);
          expect(res[0].role).toBe(roles.user);
          expect(res[1].role).toBe(roles.moderator);
          done();
        },
        error: err => {
          done.fail('Expected a successful response, not an error one');
          console.warn(err);
        },
      });

      const request = testController.expectOne(service.rolesUrl.getUsersOfUsername('a'));
      request.flush([
        {
          id: 1,
          username: 'a',
          roles: [roles.user],
        },
        {
          id: 2,
          username: 'aa',
          roles: [roles.user, roles.moderator],
        },
      ] as IUserResponse[],
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

      request.flush([
        {
          id: 2,
          username: 'ba',
          roles: [roles.user],
        },
        {
          id: 1,
          username: 'aa',
          roles: [roles.user, roles.moderator],
        },
      ] as IUserResponse[],
        {
          status: HttpStatusCode.Ok,
          statusText: 'Ok',
        }
      );
    });
  });

  describe('promoteToModerator', () => {
    it('Returns a list of users successfully', (done: DoneFn) => {
      service.promoteToModerator('1').subscribe({
        next: res => {
          expect(res.length).toBe(1);
          expect(res[0].id).toBe(1);
          expect(res[0].role).toBe(roles.admin);

          done();
        },
        error: err => {
          done.fail('Expected a successful response, not an error one');
          console.warn(err);
        },
      });

      const request = testController.expectOne(service.rolesUrl.promote('1', roles.moderator));
      request.flush([
        {
          id: 1,
          username: 'a',
          roles: [roles.moderator, roles.user, roles.admin],
        },

      ] as IUserResponse[], {
        status: HttpStatusCode.Ok,
        statusText: 'Ok'
      });
    });
  });

  describe('demoteToUser', () => {
    it('Returns a list of users successfully', (done: DoneFn) => {
      service.demoteToUser('1').subscribe({
        next: res => {
          expect(res.length).toBe(1);
          expect(res[0].id).toBe(1);
          expect(res[0].role).toBe(roles.user);

          done();
        },
        error: err => {
          done.fail('Expected a successful response, not an error one');
          console.warn(err);
        },
      });

      const request = testController.expectOne(service.rolesUrl.demote('1', roles.moderator));
      request.flush([
        {
          id: 1,
          username: 'a',
          roles: [roles.user],
        },

      ] as IUserResponse[], {
        status: HttpStatusCode.Ok,
        statusText: 'Ok'
      });
    });
  });

  describe('getActivityLogs', () => {
    it('Retrieves a list of logs', (done: DoneFn) => {
      service.getActivityLogs().subscribe({
        next: res => {
          expect(res.length).toBe(1);
          expect(res[0].message).toBe('a');
          done();
        },
        error: err => {
          console.warn(err);
          done.fail('Expected a successful response, not an error one');
        },
      });

      const request = testController.expectOne(service.logsUrl.getLogs);
      request.flush(
        [
          {
            message: 'a',
          },
        ] as ILogActivity[],
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
