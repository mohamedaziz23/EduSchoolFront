import {Component, OnInit} from '@angular/core';
import {LeaveRequestService} from "../../../Services/leave-request.service";
import {MatDialog} from '@angular/material/dialog';
import {LeaveTypeComponent} from "../leave-type/leave-type.component";
import {Router} from "@angular/router";
import {Sort} from "@angular/material/sort";
import {TableColumn} from "../../../Tools/TableColumn";
import {StatusEditDialogComponent} from "../status-edit-dialog/status-edit-dialog.component";

@Component({
  selector: 'app-leave-list',
  templateUrl: './leave-list.component.html',
  styleUrls: ['./leave-list.component.css']
})
export class LeaveListComponent implements OnInit{
  leaveRequestList:any=[];
  leaveType:any=[];
  leaveRequestTableColumns:TableColumn[] = [];

  constructor(private leaveRequest:LeaveRequestService,
              private leaveService:LeaveRequestService,
              private router:Router,
              private dialog: MatDialog,
              ) {
  }
  ngOnInit(): void {

    this.initializeColumns()
    this.getAllLeaveType()
   this.getAllLeave();
  }

  private getAllLeave(){
    this.leaveRequest.getLeaveRequestList().subscribe((res: any[]) => {
      this.leaveRequestList = res.map(item => ({
        ...item,
        startDate: new Date(item.startDate).toLocaleDateString('fr-FR'),
        endDate: new Date(item.endDate).toLocaleDateString('fr-FR'),
        leaveTypeName: item.leaveType.type,
        employeeName : item.employee.nom,
        employeeFirstName:item.employee.prenom
      }));

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

  deleteleave(leave: any) {
    this.leaveService.deleteLeave(leave.id).subscribe((res:any)=>{
      console.log(res);
      this.getAllLeave();

    })

  }

  initializeColumns(): void {
    this.leaveRequestTableColumns = [
      {
        name: 'LAST NAME',
        dataKey: 'employeeName',
        position: 'left',
        isSortable: true
      },
      {
        name: 'FIRST NAME',
        dataKey: 'employeeFirstName',
        position: 'left',
        isSortable: true
      },
      {
        name: 'DATE DEBUT',
        dataKey: 'startDate',
        position: 'left',
        isSortable: false
      },
      {
        name: 'DATE FIN',
        dataKey: 'endDate',
        position: 'left',
        isSortable: false
      },
      {
        name: 'RAISON',
        dataKey: 'reason',
        position: 'left',
        isSortable: true
      },
      {
        name: 'TYPE',
        dataKey: 'leaveTypeName',
        position: 'left',
        isSortable: true
      },
      {
        name: 'STATUS',
        dataKey: 'status',
        position: 'left',
        isSortable: false
      },

    ];
  }
  sortData(sortParameters: Sort) {
    const keyName = sortParameters.active;
    if (sortParameters.direction === 'asc') {
      this.leaveRequestList = this.leaveRequestList.sort((a: any, b: any) => a[keyName].localeCompare(b[keyName]));
    } else if (sortParameters.direction === 'desc') {
      this.leaveRequestList = this.leaveRequestList.sort((a: any, b: any) => b[keyName].localeCompare(a[keyName]));
    }
    else  this.leaveRequestList = this.leaveRequestList.sort((a: any, b: any) => a[keyName].localeCompare(b[keyName]));

  }

  openEditStatusDialog(leaveRequest: any): void {
    console.log("leaveRequest",leaveRequest);
    const dialogRef = this.dialog.open(StatusEditDialogComponent, {
      width: '500px',
      height:'300px',
      data: { leaveRequest: leaveRequest }
    });

    dialogRef.afterClosed().subscribe(result => {
        //this.updateStatus(leaveRequest.id, leaveRequest.status);

    });
  }


}
