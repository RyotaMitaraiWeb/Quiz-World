import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserQuizzesListComponent } from './user-quizzes-list.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { roles } from '../../../common/roles';
import { UserState } from '../../../store/user/user.store';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('UserQuizzesListComponent', () => {
  let component: UserQuizzesListComponent;
  let fixture: ComponentFixture<UserQuizzesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserQuizzesListComponent, NoopAnimationsModule],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserQuizzesListComponent);
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
