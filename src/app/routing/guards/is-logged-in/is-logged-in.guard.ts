import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { RoleService } from '../../../core/role-service/role.service';

export const isLoggedInGuard: CanActivateFn = (route, state) => {
  const roleService = inject(RoleService);  
  return roleService.isLoggedIn();
};
