import {Component, OnInit} from '@angular/core';
import {LeaveRequestService} from "../../../Services/leave-request.service";
import {Router} from "@angular/router";
import {LeaveTypeComponent} from "../leave-type/leave-type.component";
import {MatDialog} from "@angular/material/dialog";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-leave-type-list',
  templateUrl: './leave-type-list.component.html',
  styleUrls: ['./leave-type-list.component.css']
})
export class LeaveTypeListComponent implements OnInit{
  leaveType:any=[];
  constructor(private leaveService:LeaveRequestService,
              private router:Router,
              public dialog: MatDialog) {
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
    // Pass the ID to the dialog component
    const dialogRef = this.dialog.open(LeaveTypeComponent, {
      height: '400px',
      width: '600px',
      data: { id: id } // Pass the id to the dialog component
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllLeaveType();
    });

    //this.router.navigateByUrl(`/Leave-type/${id}`);
  }

  deleteleave(id: any) {
    this.leaveService.deleteLeaveType(id).subscribe((res:any)=>{
      console.log(res);
      this.getAllLeaveType();


    })

  }

  openDialog() {

    const dialogRef = this.dialog.open(LeaveTypeComponent, {
      height: '400px',
      width: '600px',


    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllLeaveType();

    });

  }
}
