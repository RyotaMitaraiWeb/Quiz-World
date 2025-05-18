import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OwnerOnlyDirective } from './owner-only.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserStore } from '../../../store/user/user.store';
import { roles } from '../../../common/roles';

// Test component
@Component({
  template: `
    <div id="test" *appOwnerOnly="'1'">Test Content</div>
    <div id="test2" *appOwnerOnly="'1'; rolesThatCanAlsoSee: ['Moderator']">Test Content 2</div>
    <div id="test3" *appOwnerOnly="'1'; rolesThatCanAlsoSee: ['Administrator', 'Moderator']">Test Content 3</div>
  `,
  standalone: true,
  imports: [OwnerOnlyDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestComponent {}

describe('OwnerOnlyDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent, OwnerOnlyDirective],
      providers: [UserStore],

    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('shows and hides content correctly (no roles passed)', async () => {
    const user = TestBed.inject(UserStore);
    user.updateUser({ id: '', username: '', roles: []});

    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#test')).toBeNull();

    user.updateUser({ id: '1', username: '', roles: [roles.user]});

    await fixture.whenStable();
    fixture.detectChanges();
    expect(document.querySelector('#test')).not.toBeNull();

    user.updateUser({ id: '', username: '', roles: []});

    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#test')).toBeNull();
  });

  it('Correctly shows and hide when roles are exempt (single role passed)', async () => {
    const user = TestBed.inject(UserStore);
    user.updateUser({ id: '', username: '', roles: []});

    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#test2')).toBeNull();

    // only role matches
    user.updateUser({ id: '', username: '', roles: [roles.moderator]});
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('#test2')).not.toBeNull();

    // only ownerID matches
    user.updateUser({ id: '1', username: '', roles: []});
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('#test2')).not.toBeNull();

    // both criteria match
    user.updateUser({ id: '1', username: '', roles: [roles.moderator]});
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('#test2')).not.toBeNull();
  });

  it('Correctly shows and hide when roles are exempt (single role passed)', async () => {
    const user = TestBed.inject(UserStore);
    user.updateUser({ id: '', username: '', roles: []});

    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#test3')).toBeNull();

    // only roles match
    user.updateUser({ id: '', username: '', roles: [roles.moderator, roles.admin]});
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('#test3')).not.toBeNull();

    // only ownerID matches
    user.updateUser({ id: '1', username: '', roles: []});
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('#test3')).not.toBeNull();

    // owner ID with only part of the roles
    user.updateUser({ id: '1', username: '', roles: [roles.moderator]});
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#test3')).not.toBeNull();

    user.updateUser({ id: '1', username: '', roles: [roles.admin]});
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#test3')).not.toBeNull();

    // all criteria match
    user.updateUser({ id: '1', username: '', roles: [roles.admin, roles.moderator]});
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#test3')).not.toBeNull();
  });
});
