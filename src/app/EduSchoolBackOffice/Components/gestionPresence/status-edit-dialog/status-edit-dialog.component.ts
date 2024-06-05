import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LeaveRequestService} from "../../services/presenceService/leave-request.service";

@Component({
  selector: 'app-status-edit-dialog',
  templateUrl: './status-edit-dialog.component.html',
  styleUrls: ['./status-edit-dialog.component.css']
})
export class StatusEditDialogComponent implements OnInit{

  selectedStatus:any;
  statusOptions:any=["pending","approved","rejected"];
  constructor(public dialogRef: MatDialogRef<StatusEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private leaveRequest:LeaveRequestService) {
  }

  ngOnInit() {
    this.selectedStatus = this.data.leaveRequest.status;
  }


    updateStatus() {
      console.log("dddddddddddd",this.selectedStatus)
      this.leaveRequest.updateLeaveRequestStatus(this.data.leaveRequest.id,this.selectedStatus).subscribe((res:any)=>{
        console.log("response", res)
        this.dialogRef.close();
        window.location.reload();
      })
    }


  onNoClick(): void {
    this.dialogRef.close();
  }

}
