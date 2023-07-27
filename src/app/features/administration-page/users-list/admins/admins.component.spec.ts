import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsComponent } from './admins.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppStoreModule } from '../../../../store/app-store.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AdminsComponent', () => {
  let component: AdminsComponent;
  let fixture: ComponentFixture<AdminsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AdminsComponent, HttpClientTestingModule, AppStoreModule, NoopAnimationsModule]
    });
    fixture = TestBed.createComponent(AdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
