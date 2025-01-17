import { computed } from "@angular/core";
import { role, roles } from "../../common/roles";
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

export interface UserState {
  id: string;
  username: string;
  roles: role[];
}

export const initialUserState: UserState = {
  id: '',
  username: '',
  roles: [],
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialUserState),
  withComputed(state => (
    {
      isLoggedIn: computed(() => state.id() !== ''),
      isModerator: computed(() => state.roles().includes(roles.moderator)),
      isAdmin: computed(() => state.roles().includes(roles.admin))
    }
  )),
  withMethods(store => (
    {
      updateUser(user: UserState) {
        patchState(store, user)
      },
      logout() {
        patchState(store, initialUserState)
      }
    }
  )));