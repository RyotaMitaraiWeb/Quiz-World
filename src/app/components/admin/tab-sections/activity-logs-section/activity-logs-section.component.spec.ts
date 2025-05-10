import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ActivityLogsSectionComponent } from './activity-logs-section.component';
import { SearchOptionsWithPaginationAndOrdering } from '../../../../types/search';
import { Observable, of } from 'rxjs';
import { IndexedLogsList } from '../../../../services/admin/logs.types';
import { HarnessLoader } from '@angular/cdk/testing';
import { AdminService } from '../../../../services/admin/admin.service';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatTableHarness } from '@angular/material/table/testing';
import { MatPaginatorHarness } from '@angular/material/paginator/testing';
import { MatSelectHarness } from '@angular/material/select/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

const fillData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
const mockActivityLogs: IndexedLogsList = {
  total: fillData.length,
  logs: fillData.filter((_, i) => i < 20).map(number => ({ index: number, message: number.toString(), date: new Date(number).toDateString() })),
};

describe('ActivityLogsSectionComponent', () => {
  let component: ActivityLogsSectionComponent;
  let fixture: ComponentFixture<ActivityLogsSectionComponent>;
  let adminService: AdminService;
  let loader: HarnessLoader;
  let spy: jasmine.Spy<(options: SearchOptionsWithPaginationAndOrdering) => Observable<IndexedLogsList>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityLogsSectionComponent, NoopAnimationsModule],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityLogsSectionComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);

    component = fixture.componentInstance;

    adminService = TestBed.inject(AdminService);
    spy = spyOn(adminService, 'getActivityLogs').and.returnValue(of({ total: fillData.length, logs: mockActivityLogs.logs.filter((_, i) => i < 20)}));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Initializes table correctly', fakeAsync(async () => {
    tick();
    await fixture.whenStable();
    fixture.detectChanges();
    const table = await loader.getHarness(MatTableHarness);
    const rows = await table.getRows();
    expect(rows.length).toBe(20);
  }));

  describe('Paginator', () => {
    it('Updates table when page is changed', fakeAsync(async () => {
      tick();
      await fixture.whenStable();
      fixture.detectChanges();
      spy.and.returnValue(of({ total: 1, logs: [mockActivityLogs.logs[0]] } as IndexedLogsList));
      const table = await loader.getHarness(MatTableHarness);

      const paginator = await loader.getHarness(MatPaginatorHarness);
      await paginator.goToNextPage();

      fakeAsync(() => {
        tick();
      })();

      await fixture.whenStable();
      fixture.detectChanges();
      const rows = await table.getRows();
      expect(rows.length).toBe(1);
    }));
  });

  describe('Order by', () => {
    it('Updates table when the order is changed', fakeAsync(async () => {
      tick();
      await fixture.whenStable();
      fixture.detectChanges();
      spy.and.returnValue(of({ total: 20, logs: [...mockActivityLogs.logs].reverse().filter((_, i) => i < 20) } as IndexedLogsList));
      const table = await loader.getHarness(MatTableHarness);
      const orderBySelectMenu = await loader.getHarness(MatSelectHarness);

      await orderBySelectMenu.open();

      const options = await orderBySelectMenu.getOptions();
      await options[1].click();

      fakeAsync(() => {
        tick();
      })();

      await fixture.whenStable();
      fixture.detectChanges();
      const rows = await table.getRows();
      expect(rows.length).toBe(20);

      const firstValue = (await rows[0].getCellTextByIndex())[0];
      const expectedValue = mockActivityLogs.logs[mockActivityLogs.logs.length - 1].index.toString();
      expect(firstValue).toBe(expectedValue);
    }));
  });
});
