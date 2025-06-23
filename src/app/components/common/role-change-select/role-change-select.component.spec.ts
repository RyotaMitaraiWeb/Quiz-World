import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleChangeSelectComponent } from './role-change-select.component';
import { role, roles } from '../../../common/roles';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatSelectHarness } from '@angular/material/select/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RoleChangeSelectEventType } from './types';

const mockRoles = [roles.moderator, roles.admin, roles.user] as role[];

describe('RoleChangeSelectComponent', () => {
  let component: RoleChangeSelectComponent;
  let fixture: ComponentFixture<RoleChangeSelectComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleChangeSelectComponent, NoopAnimationsModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleChangeSelectComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('roles', mockRoles);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initializes the select tag correctly', async () => {
    fixture.componentRef.setInput('roles', mockRoles);
    fixture.detectChanges();

    const select = await loader.getHarness(MatSelectHarness);
    await select.open();
    const options = await select.getOptions();

    const moderatorOption = options.find(async option => await option.getText() === roles.moderator);
    expect(await moderatorOption?.isSelected()).toBeTrue();

    const adminOption = options.find(async option => await option.getText() === roles.admin);
    expect(await adminOption?.isSelected()).toBeTrue();
  });

  it('Correctly emits a promotion event', async () => {
    fixture.componentRef.setInput('roles', [roles.user]);
    fixture.detectChanges();
    const spy = spyOn(component.roleSelect, 'emit');

    const select = await loader.getHarness(MatSelectHarness);
    await select.open();
    const options = await select.getOptions();

    const moderatorOption = options[0];

    await moderatorOption?.click();

    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith({ type: RoleChangeSelectEventType.Promote, value: roles.moderator });

  });

  it('Correctly emits a demotion event', async () => {
    fixture.componentRef.setInput('roles', [roles.moderator, roles.user, roles.admin]);
    fixture.detectChanges();
    const spy = spyOn(component.roleSelect, 'emit');

    const select = await loader.getHarness(MatSelectHarness);
    await select.open();
    const options = await select.getOptions();

    const moderatorOption = options[0];

    await moderatorOption?.click();

    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith({ type: RoleChangeSelectEventType.Demote, value: roles.moderator });

  });

  it('Toggles between promotion and demotion correctly (thus keeping track of the current state)', async () => {
    fixture.componentRef.setInput('roles', [roles.moderator, roles.user, roles.admin]);
    fixture.detectChanges();
    const spy = spyOn(component.roleSelect, 'emit');

    const select = await loader.getHarness(MatSelectHarness);
    await select.open();
    const options = await select.getOptions();

    const moderatorOption = options[0];

    await moderatorOption.click();
    expect(spy).toHaveBeenCalledWith({ type: RoleChangeSelectEventType.Demote, value: roles.moderator });

    await moderatorOption.click();
    expect(spy).toHaveBeenCalledWith({ type: RoleChangeSelectEventType.Promote, value: roles.moderator });

    await moderatorOption.click();
    expect(spy).toHaveBeenCalledWith({ type: RoleChangeSelectEventType.Demote, value: roles.moderator });
  });
});
