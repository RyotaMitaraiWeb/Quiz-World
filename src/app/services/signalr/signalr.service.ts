import { Injectable } from '@angular/core';
import {
  HttpTransportType,
  HubConnection,
  HubConnectionBuilder,
} from '@microsoft/signalr';
import { events, hubs } from '../../common/hubs';
import { BehaviorSubject, Subject } from 'rxjs';
import { UserState } from '../../store/user/user.store';
import { role } from '../../common/roles';

interface RoleChange {
  role: role;
}

@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  private hubConnection!: HubConnection;
  private receiveCredentials = new BehaviorSubject<UserState>({
    id: '',
    username: '',
    roles: [],
  });

  private roleAdded = new Subject<RoleChange>();
  private roleRemoved = new Subject<RoleChange>();

  receiveCredentials$ = this.receiveCredentials.asObservable();
  roleAdded$ = this.roleAdded.asObservable();
  roleRemoved$ = this.roleRemoved.asObservable();

  connect() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(hubs.session, {
        accessTokenFactory: () => localStorage.getItem('token') || '',
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('connection started'))
      .catch(console.log);

    this._registerEvents();
  }

  private _registerEvents() {
    this.hubConnection.on(events.ReceiveCredentials, (user: UserState) => {
      this.receiveCredentials.next(user);
    });

    this.hubConnection.on(events.RoleAdded, (data: RoleChange) => {
      this.roleAdded.next(data);
    });

    this.hubConnection.on(events.RoleRemoved, (data: RoleChange) => {
      this.roleRemoved.next(data);
    });
  }

  disconnect() {
    if (this.hubConnection) {
      this.hubConnection.stop();
    }
  }
}
