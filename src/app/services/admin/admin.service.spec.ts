import { TestBed } from '@angular/core/testing';

import { AdminService } from './admin.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { LogsList } from './logs.types';

describe('AdminService', () => {
  let service: AdminService;
  let httpTest: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });

    service = TestBed.inject(AdminService);
    httpTest = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getActivityLogs', () => {
    it('Correctly handles response transformation', (done: DoneFn) => {
      const logs: LogsList = {
        total: 3,
        logs: [
          {
            message: 'a',
            date: 'a',
          },
          {
            message: 'a',
            date: 'a',
          },
          {
            message: 'a',
            date: 'a',
          },
        ]
      };

      service.getActivityLogs({ page: 3 }).subscribe(v => {
        expect(v.total).toBe(logs.total);
        expect(v.logs.map(l => l.index)).toEqual([41, 42, 43]);
        done();
      })

      const request = httpTest.expectOne(match => match.url === service.logsUrl.getLogs);
      request.flush(logs);
    });
  });

  afterEach(() => {
    httpTest.verify();
  });
});
