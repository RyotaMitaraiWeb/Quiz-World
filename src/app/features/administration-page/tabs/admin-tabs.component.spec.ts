import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTabsComponent } from './admin-tabs.component';

describe('AdminTabsComponent', () => {
  let component: AdminTabsComponent;
  let fixture: ComponentFixture<AdminTabsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AdminTabsComponent]
    });
    fixture = TestBed.createComponent(AdminTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
