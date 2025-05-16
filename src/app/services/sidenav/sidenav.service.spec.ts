import { TestBed } from '@angular/core/testing';

import { SidenavService } from './sidenav.service';

describe('SidenavService', () => {
  let service: SidenavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidenavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('toggles state correctly (integration test for open and close)', (done: DoneFn) => {
    service.afterClosed.subscribe(() => {
      done();
    });

    expect(service.isOpen()).toBeFalse();

    service.open();

    expect(service.isOpen()).toBeTrue();

    service.close();

    expect(service.isOpen()).toBeFalse();
  });
});
