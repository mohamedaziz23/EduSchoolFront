import {Component, OnInit} from '@angular/core';
import {LeaveRequestService} from "../../../Services/leave-request.service";

@Component({
  selector: 'app-leave-list',
  templateUrl: './leave-list.component.html',
  styleUrls: ['./leave-list.component.css']
})
export class LeaveListComponent implements OnInit{
  leaveRequestList:any=[];
  constructor(private leaveRequest:LeaveRequestService) {
  }
  ngOnInit(): void {
    this.leaveRequest.getLeaveRequestList().subscribe((res:any)=>{
      this.leaveRequestList=res;
      console.log(this.leaveRequestList)

    })
  }

}
