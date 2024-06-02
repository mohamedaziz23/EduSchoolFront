import {Component, OnInit} from '@angular/core';
import {LeaveRequestService} from "../../../Services/leave-request.service";
import {Router} from "@angular/router";
import {LeaveTypeComponent} from "../leave-type/leave-type.component";
import {MatDialog} from "@angular/material/dialog";
import Swal from 'sweetalert2';
import {TableColumn} from "../../../Tools/TableColumn";
import {Sort} from "@angular/material/sort";

@Component({
  selector: 'app-leave-type-list',
  templateUrl: './leave-type-list.component.html',
  styleUrls: ['./leave-type-list.component.css']
})
export class LeaveTypeListComponent implements OnInit{
  leaveType:any=[];
  leaveTypeTableColumns:TableColumn[] = [];
  constructor(private leaveService:LeaveRequestService,
              private router:Router,
              public dialog: MatDialog) {
  }

  ngOnInit(){
    this.initializeColumns();
   this.getAllLeaveType();

  }

  private getAllLeaveType(){
    this.leaveService.getLeaveTypeList().subscribe((res:any)=>{
      this.leaveType=res;

    })

  }
  updateleave(leaveType: any) {
    const dialogRef = this.dialog.open(LeaveTypeComponent, {
      height: '400px',
      width: '600px',
      data: { id: leaveType.id } // Pass the id to the dialog component
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllLeaveType();
    });
  }
  deleteleave(leaveType: any) {
    this.leaveService.deleteLeaveType(leaveType.id).subscribe((res:any)=>{
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
  initializeColumns(): void {
    this.leaveTypeTableColumns = [
      {
        name: 'TYPE',
        dataKey: 'type',
        position: 'left',
        isSortable: true
      },
      {
        name: 'DESCRIPTION',
        dataKey: 'description',
        position: 'left',
        isSortable: false
      },

    ];
  }
  sortData(sortParameters: Sort) {
    const keyName = sortParameters.active;
    if (sortParameters.direction === 'asc') {
      this.leaveType = this.leaveType.sort((a: any, b: any) => a[keyName].localeCompare(b[keyName]));
    } else if (sortParameters.direction === 'desc') {
      this.leaveType = this.leaveType.sort((a: any, b: any) => b[keyName].localeCompare(a[keyName]));
    }
    else  this.leaveType = this.leaveType.sort((a: any, b: any) => a[keyName].localeCompare(b[keyName]));

  }
}
