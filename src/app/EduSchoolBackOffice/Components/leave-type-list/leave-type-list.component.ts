import {Component, OnInit} from '@angular/core';
import {LeaveRequestService} from "../../Services/leave-request.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-leave-type-list',
  templateUrl: './leave-type-list.component.html',
  styleUrls: ['./leave-type-list.component.css']
})
export class LeaveTypeListComponent implements OnInit{
  leaveType:any=[];
  constructor(private leaveService:LeaveRequestService,private router:Router) {
  }

  ngOnInit(){
   this.getAllLeaveType();

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
