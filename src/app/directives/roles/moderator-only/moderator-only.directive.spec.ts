import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModeratorOnlyDirective } from './moderator-only.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserStore } from '../../../store/user/user.store';
import { roles } from '../../../common/roles';

// Test component
@Component({
  template: `
    <div id="test" *appModeratorOnly>Moderator Content</div>
  `,
  standalone: true,
  imports: [ModeratorOnlyDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestComponent {}

describe('ModeratorOnlyDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent, ModeratorOnlyDirective],
      providers: [UserStore],

    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('shows and hides content correctly', async () => {
    const user = TestBed.inject(UserStore);
    user.updateUser({ id: '', username: '', roles: [roles.user]});

    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#test')).toBeNull();

    user.updateUser({ id: '', username: '', roles: [roles.moderator]});

    await fixture.whenStable();
    fixture.detectChanges();
    expect(document.querySelector('#test')).not.toBeNull();

    user.updateUser({ id: '', username: '', roles: [roles.user]});

    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#test')).toBeNull();
  });
});
