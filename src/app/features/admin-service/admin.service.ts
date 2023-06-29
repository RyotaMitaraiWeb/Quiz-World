import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoleService } from '../../core/role-service/role.service';

/**
 * An injectable service that makes HTTP calls relating to administration,
 * such as promoting and demoting users and obtaining logs.
 * 
 * Note that each method runs only if the role service's ``isAdmin``
 * method returns true.
 */
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private readonly http: HttpClient,
    private readonly roleService: RoleService,
  ) { }


}
