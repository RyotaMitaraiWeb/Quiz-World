import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorsComponent } from './moderators.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppStoreModule } from '../../../../store/app-store.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ModeratorsComponent', () => {
  let component: ModeratorsComponent;
  let fixture: ComponentFixture<ModeratorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ModeratorsComponent, HttpClientTestingModule, AppStoreModule, NoopAnimationsModule]
    });
    fixture = TestBed.createComponent(ModeratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
