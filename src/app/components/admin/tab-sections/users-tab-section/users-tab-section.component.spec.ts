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
import { MatPaginatorHarness } from '@angular/material/paginator/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { SearchOptionsWithPaginationAndOrdering } from '../../../../types/search';
import { MatSelectHarness } from '@angular/material/select/testing';

const mockUserData: UserList = {
  total: 21,
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
    {
      username: 'b',
      roles: [roles.user],
      id: '3',
    },
    {
      username: 'c',
      roles: [roles.user, roles.moderator],
      id: '4',
    },
    {
      username: 'ac',
      roles: [roles.user],
      id: '5',
    },
    {
      username: 'd',
      roles: [roles.user, roles.moderator],
      id: '6',
    },
    {
      username: 'ad',
      roles: [roles.user],
      id: '7',
    },
    {
      username: 'e',
      roles: [roles.user, roles.moderator],
      id: '8',
    },
    {
      username: 'ae',
      roles: [roles.user],
      id: '9',
    },
    {
      username: 'f',
      roles: [roles.user, roles.moderator],
      id: '10',
    },
    {
      username: 'af',
      roles: [roles.user],
      id: '11',
    },
    {
      username: 'g',
      roles: [roles.user, roles.moderator],
      id: '12',
    },
    {
      username: 'ag',
      roles: [roles.user],
      id: '13',
    },
    {
      username: 'h',
      roles: [roles.user, roles.moderator],
      id: '14',
    },
    {
      username: 'ah',
      roles: [roles.user],
      id: '15',
    },
    {
      username: 'i',
      roles: [roles.user, roles.moderator],
      id: '16',
    },
    {
      username: 'ai',
      roles: [roles.user],
      id: '17',
    },
    {
      username: 'j',
      roles: [roles.user, roles.moderator],
      id: '18',
    },
    {
      username: 'aj',
      roles: [roles.user],
      id: '19',
    },
    {
      username: 'k',
      roles: [roles.user, roles.moderator],
      id: '20',
    },
    {
      username: 'ak',
      roles: [roles.user, roles.moderator],
      id: '21',
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
    spy = spyOn(adminService, 'getUsersOfRole').and.returnValue(of({...mockUserData, users: mockUserData.users.filter((_, i) => i < 20)}));
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
    expect(rows.length).toBe(20);
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

  describe('Paginator', () => {
    it('Updates table when page is changed', fakeAsync(async () => {
      tick();
      await fixture.whenStable();
      fixture.detectChanges();
      spy.and.returnValue(of({ total: 1, users: [mockUserData.users[20]] } as UserList));
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
      spy.and.returnValue(of({ total: 20, users: [...mockUserData.users].reverse().filter((_, i) => i < 20) } as UserList));
      const table = await loader.getHarness(MatTableHarness);

      const selectMenus = await loader.getAllHarnesses(MatSelectHarness);
      const orderBySelectMenu = selectMenus[1];

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
      const expectedValue = mockUserData.users[mockUserData.users.length - 1].username;
      expect(firstValue).toBe(expectedValue);
    }));
  });
});
