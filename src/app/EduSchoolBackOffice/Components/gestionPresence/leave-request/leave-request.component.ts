import {Component, OnInit} from '@angular/core';
import {LeaveRequestService} from "../../../Services/leave-request.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.css']
})
export class LeaveRequestComponent implements OnInit{
  leaveTypeList:any=[];
  leaveRequestForm!: FormGroup;
  leaveRequestToPost:any;
  constructor(private leaveRequest:LeaveRequestService,
              private fb:FormBuilder) {
  }
  ngOnInit(): void {
    this.leaveRequest.getLeaveTypeList().subscribe((res:any)=>{
      this.leaveTypeList=res;

    })
    this.leaveRequestForm=this.fb.group({
      startDate:[null,Validators.required],
      endDate:[null,Validators.required],
      reason:[null,Validators.required],
      leaveType:[null,Validators.required]
    })
  }

  addLeaveRequest(leaveRequest:any) {
    this.leaveRequestToPost={
      "startDate":leaveRequest.startDate,
      "endDate":leaveRequest.endDate,
      "reason":leaveRequest.reason,
      "status":"pending",

    }
this.leaveRequest.addLeaveRequest(this.leaveRequestToPost).subscribe((res:any)=>{
  console.log(res)

})

  }
}
