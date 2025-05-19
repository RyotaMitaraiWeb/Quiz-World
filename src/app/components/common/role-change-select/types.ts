import { role } from '../../../common/roles';

export enum RoleChangeSelectEventType {
  Promote,
  Demote,
}

export interface RoleChangeSelectEvent {
  type: RoleChangeSelectEventType;
  value: role;
}