import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor() { }

  private leaveRequestSource = new BehaviorSubject<any>(null);
  leaveRequest$ = this.leaveRequestSource;

  notifyLeaveRequest(leaveRequest: any) {
    this.leaveRequestSource.next(leaveRequest);
  }


}
