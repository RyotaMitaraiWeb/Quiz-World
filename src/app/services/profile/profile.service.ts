import { inject, Injectable } from '@angular/core';
import { api } from '../../common/api';
import { HttpClient } from '@angular/common/http';
import { User, UserList } from '../admin/searchTable.types';
import { SearchProfilesParameters } from '../../types/search';
import { paramsBuilder } from '../../util/paramsBuilder';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  readonly url = api.endpoints.profiles;
  private readonly http = inject(HttpClient);

  getProfileByUsername(username: string) {
    return this.http.get<User>(this.url.getByUsername(username));
  }

  searchProfiles(searchParams: SearchProfilesParameters) {
    const params = paramsBuilder(searchParams);
    return this.http.get<UserList>(this.url.search, {
      params,
    });
  }
}
