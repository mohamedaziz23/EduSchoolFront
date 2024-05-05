import {Component, OnInit} from '@angular/core';
import {LeaveRequestService} from "../../../Services/leave-request.service";
import {MatDialog} from '@angular/material/dialog';
import {LeaveTypeComponent} from "../leave-type/leave-type.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-leave-list',
  templateUrl: './leave-list.component.html',
  styleUrls: ['./leave-list.component.css']
})
export class LeaveListComponent implements OnInit{
  leaveRequestList:any=[];
  leaveType:any=[];
  constructor(private leaveRequest:LeaveRequestService,
              private leaveService:LeaveRequestService,
              private router:Router) {
  }
  ngOnInit(): void {
    this.getAllLeaveType()
    this.leaveRequest.getLeaveRequestList().subscribe((res:any)=>{
      this.leaveRequestList=res;
      console.log(this.leaveRequestList)

    })
  }



  private getAllLeaveType(){
    this.leaveService.getLeaveTypeList().subscribe((res:any)=>{
      this.leaveType=res;

    })

  }

  updateleave(id: any) {
    this.router.navigateByUrl(`/Leave-type/${id}`);

  }

  deleteleave(id: any) {
    this.leaveService.deleteLeaveType(id).subscribe((res:any)=>{
      console.log(res);
      this.getAllLeaveType();

    })

  }
}
