import { TestBed } from "@angular/core/testing";
import { UserState, UserStore } from "./user.store";
import { roles } from "../../common/roles";

const user: UserState = {
  id: '1',
  username: 'a',
  roles: [roles.user, roles.moderator, roles.admin],
}

describe('User store', () => {
  describe('Integration tests', () => {
    it('updateUser and restartUser', () => {
      const store = TestBed.inject(UserStore);
      expect(store.id()).withContext('The initial state has been modified').toBe('');

      store.updateUser({ id: '1', username: 'a', roles: [roles.user]});
      expect(store.id()).toBe('1');
      expect(store.username()).toBe('a');
      expect(store.roles()).toEqual([roles.user]);

      store.logout();
      expect(store.id()).withContext('User state has not restarted correctly').toBe('');
    });

    describe('Computed methods', () => {
      it('isLoggedIn', () => {
        const store = TestBed.inject(UserStore);

        store.updateUser(user);
        expect(store.isLoggedIn()).toBeTrue();

        store.logout();
        expect(store.isLoggedIn()).toBeFalse();
      });

      it('isModerator', () => {
        const store = TestBed.inject(UserStore);

        store.updateUser(user);
        expect(store.isModerator()).toBeTrue();

        store.logout();
        expect(store.isModerator()).toBeFalse();
      });

      it('isAdmin', () => {
        const store = TestBed.inject(UserStore);

        store.updateUser(user);
        expect(store.isAdmin()).toBeTrue();

        store.logout();
        expect(store.isAdmin()).toBeFalse();
      });
    });
  });
});