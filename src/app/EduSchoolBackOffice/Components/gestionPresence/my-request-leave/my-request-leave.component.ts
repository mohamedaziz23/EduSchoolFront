import {Component, OnInit} from '@angular/core';
import {LeaveRequestService} from "../../../Services/leave-request.service";
import {Sort} from "@angular/material/sort";
import {TableColumn} from "../../../Tools/TableColumn";

@Component({
  selector: 'app-my-request-leave',
  templateUrl: './my-request-leave.component.html',
  styleUrls: ['./my-request-leave.component.css']
})
export class MyRequestLeaveComponent implements OnInit{
  leaveRequestTableColumns:TableColumn[] = [];
  leaveRequestList:any=[];
  filteredData:any=[];
  idUser:any;
  constructor(private leaveRequest:LeaveRequestService) {
  }
  ngOnInit(): void {
    this.initializeColumns();
    this.idUser = localStorage.getItem("id"); // Convertir en nombre avec le signe +
    console.log(this.idUser);
    this.getAllLeaveRequest();
  }

  getAllLeaveRequest() {
    this.leaveRequest.getLeaveRequestList().subscribe((res: any[]) => {
      this.leaveRequestList = res.map(item => ({
        ...item,
        startDate: new Date(item.startDate).toLocaleDateString('fr-FR'),
        endDate: new Date(item.endDate).toLocaleDateString('fr-FR'),
        leaveTypeName: item.leaveType.type
      }));
      console.log(this.leaveRequestList);

      this.filteredData = this.leaveRequestList.filter((l: any) => l.employee.id == this.idUser); // Convertir en nombre avec le signe +
      console.log(this.filteredData);
    });
  }


  initializeColumns(): void {
    this.leaveRequestTableColumns = [
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
      this.filteredData = this.filteredData.sort((a: any, b: any) => a[keyName].localeCompare(b[keyName]));
    } else if (sortParameters.direction === 'desc') {
      this.filteredData = this.filteredData.sort((a: any, b: any) => b[keyName].localeCompare(a[keyName]));
    }
    else  this.filteredData = this.filteredData.sort((a: any, b: any) => a[keyName].localeCompare(b[keyName]));

  }

  deleteleave($event: any) {

  }

  openEditStatusDialog($event: any) {

  }
}
