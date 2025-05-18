import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private requests = new BehaviorSubject(0);

  get noRequests$() {
    return this.requests.asObservable().pipe(map(r => r === 0));
  }

  addRequest() {
    this.requests.next(this.requests.value + 1);
  }

  removeRequest() {
    this.requests.next(this.requests.value - 1);
  }
}
