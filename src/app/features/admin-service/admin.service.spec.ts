import { TestBed } from '@angular/core/testing';

import { AdminService } from './admin.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppStoreModule } from '../../store/app-store.module';
import { IUser, IUserResponse } from '../../../types/responses/administration.types';
import { roles } from '../../constants/roles.constants';
import { HttpStatusCode } from '@angular/common/http';

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
      const request = testController.expectOne(service.url.getModerators);
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

  afterEach(() => {
    testController.verify();
  });
});
