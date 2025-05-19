import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileOverviewComponent } from './profile-overview.component';
import { UserState } from '../../../store/user/user.store';
import { roles } from '../../../common/roles';

describe('ProfileOverviewComponent', () => {
  let component: ProfileOverviewComponent;
  let fixture: ComponentFixture<ProfileOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileOverviewComponent],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileOverviewComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('user', {
      id: '1',
      username: 'a',
      roles: [roles.user],
    } as UserState);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
