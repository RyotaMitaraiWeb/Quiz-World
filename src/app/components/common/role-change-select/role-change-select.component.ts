import { Component, model, output } from '@angular/core';
import { role, rolesThatCanBeGivenOrRemoved } from '../../../common/roles';
import { MatSelectModule } from '@angular/material/select';
import { RoleChangeSelectEvent, RoleChangeSelectEventType } from './types';
import { MatOptionSelectionChange } from '@angular/material/core';

@Component({
  selector: 'app-role-change-select',
  imports: [MatSelectModule],
  templateUrl: './role-change-select.component.html',
  styleUrl: './role-change-select.component.scss',
})
export class RoleChangeSelectComponent {
  roles = model.required<role[]>();
  select = output<RoleChangeSelectEvent>();

  protected readonly rolesList = rolesThatCanBeGivenOrRemoved;

  change(event: MatOptionSelectionChange) {
    if (!event.isUserInput) return;

    const value = event.source.value as role;

    const currentValue = this.roles();
    const type = this.determineRoleChangeSelectEventType(value, currentValue);

    this.select.emit({ type, value });
  }

  private determineRoleChangeSelectEventType(eventValue: role, currentValue: role[]): RoleChangeSelectEventType {
    return !currentValue.includes(eventValue) ? RoleChangeSelectEventType.Promote : RoleChangeSelectEventType.Demote;
  }
}
