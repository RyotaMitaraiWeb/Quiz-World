import { Injectable } from '@angular/core';
import {
  HttpTransportType,
  HubConnection,
  HubConnectionBuilder,
} from '@microsoft/signalr';
import { events, hubs } from '../../common/hubs';
import { BehaviorSubject } from 'rxjs';
import { UserState } from '../../store/user/user.store';

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

  receiveCredentials$ = this.receiveCredentials.asObservable();

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
  }

  disconnect() {
    if (this.hubConnection) {
      this.hubConnection.stop();
    }
  }
}
