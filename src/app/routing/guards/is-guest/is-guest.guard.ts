import { CanActivateFn } from '@angular/router';
import { RoleService } from '../../../core/role-service/role.service';
import { inject } from '@angular/core';

export const isGuestGuard: CanActivateFn = (route, state) => {
  const roleService = inject(RoleService);  
  return roleService.isGuest();
};
