import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { UsersTabSectionComponent } from './users-tab-section.component';
import { AdminService } from '../../../../services/admin/admin.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of } from 'rxjs';
import { UserList } from '../../../../services/admin/searchTable.types';
import { roles } from '../../../../common/roles';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatTableHarness } from '@angular/material/table/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { SearchOptionsWithPaginationAndOrdering } from '../../../../types/search';
import { MatSelectHarness } from '@angular/material/select/testing';
const mockUserData: UserList = {
  total: 2,
  users: [
    {
      username: 'a',
      roles: [roles.user],
      id: '1',
    },
    {
      username: 'ab',
      roles: [roles.user, roles.moderator],
      id: '2',
    },
  ],
};

describe('UsersTabSectionComponent', () => {
  let component: UsersTabSectionComponent;
  let fixture: ComponentFixture<UsersTabSectionComponent>;
  let adminService: AdminService;
  let loader: HarnessLoader;

  let spy: jasmine.Spy<(role: string, username: string, options: SearchOptionsWithPaginationAndOrdering) => Observable<UserList>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersTabSectionComponent, NoopAnimationsModule],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersTabSectionComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    adminService = TestBed.inject(AdminService);
    spy = spyOn(adminService, 'getUsersOfRole').and.returnValue(of(mockUserData));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Correctly populates the table upon initialization', fakeAsync(async () => {
    tick();
    await fixture.whenStable();
    fixture.detectChanges();
    const table = await loader.getHarness(MatTableHarness);
    const rows = await table.getRows();
    expect(rows.length).toBe(mockUserData.users.length);
  }));

  describe('Search field', () => {
    it('Updates table correctly when the search API call is successful', fakeAsync(async () => {
      tick();
      await fixture.whenStable();
      fixture.detectChanges();
      spy.and.returnValue(of({ total: 1, users: [mockUserData.users[0]] } as UserList));
      const table = await loader.getHarness(MatTableHarness);

      const searchField = await loader.getHarness(MatInputHarness);
      await searchField.setValue('b');

      fakeAsync(() => {
        tick();
      })();

      await fixture.whenStable();
      fixture.detectChanges();
      const rows = await table.getRows();
      expect(rows.length).toBe(1);
    }));
  });

  describe('Role filter', () => {
    it('Updates table correctly when a role is selected', fakeAsync(async () => {
      tick();
      await fixture.whenStable();
      fixture.detectChanges();
      spy.and.returnValue(of({ total: 1, users: [mockUserData.users[0]] } as UserList));
      const table = await loader.getHarness(MatTableHarness);

      const select = await loader.getHarness(MatSelectHarness);
      await select.open();

      const options = await select.getOptions();
      const option = options[1];

      await option.click();

      fakeAsync(() => {
        tick();
      })();

      await fixture.whenStable();
      fixture.detectChanges();
      const rows = await table.getRows();
      expect(rows.length).toBe(1);
    }));
  });
});
