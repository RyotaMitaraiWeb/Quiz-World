import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthenticatedOnlyDirective } from './authenticated-only.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserStore } from '../../../store/user/user.store';
import { roles } from '../../../common/roles';

// Test component
@Component({
  template: `
    <div id="test" *appAuthenticatedOnly>Authenticated Content</div>
  `,
  standalone: true,
  imports: [AuthenticatedOnlyDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestComponent {}

describe('AuthenticatedOnlyDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent, AuthenticatedOnlyDirective],
      providers: [UserStore],

    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('shows and hides content correctly', async () => {
    const user = TestBed.inject(UserStore);
    user.updateUser({ id: '', username: '', roles: []});

    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#test')).toBeNull();

    user.updateUser({ id: '', username: '', roles: [roles.user]});

    await fixture.whenStable();
    fixture.detectChanges();
    expect(document.querySelector('#test')).not.toBeNull();

    user.updateUser({ id: '', username: '', roles: []});

    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#test')).toBeNull();

    user.updateUser({ id: '', username: '', roles: [roles.user, roles.admin]});

    await fixture.whenStable();
    fixture.detectChanges();
    expect(document.querySelector('#test')).not.toBeNull();
  });
});
