import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesListPageComponent } from './roles-list-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppStoreModule } from '../../../../store/app-store.module';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('RolesListPageComponent', () => {
  let component: RolesListPageComponent;
  let fixture: ComponentFixture<RolesListPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RolesListPageComponent,
        HttpClientTestingModule,
        AppStoreModule,
        RouterTestingModule,
        NoopAnimationsModule,
      ]
    });
    fixture = TestBed.createComponent(RolesListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
