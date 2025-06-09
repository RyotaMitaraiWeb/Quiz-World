import { inject, Injectable } from '@angular/core';
import { api } from '../../common/api';
import { HttpClient } from '@angular/common/http';
import { User } from '../admin/searchTable.types';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  readonly url = api.endpoints.profiles;
  private readonly http = inject(HttpClient);

  getProfileByUsername(username: string) {
    return this.http.get<User>(this.url.getByUsername(username));
  }
}
