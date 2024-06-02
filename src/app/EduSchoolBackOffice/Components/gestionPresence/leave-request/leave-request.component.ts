import {Component, OnInit} from '@angular/core';
import {LeaveRequestService} from "../../services/presenceService/leave-request.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.css']
})
export class LeaveRequestComponent implements OnInit {
  leaveTypeList: any = [];
  leaveRequestForm!: FormGroup;
  leaveRequestToPost: any;
  today: any;

  constructor(private leaveRequest: LeaveRequestService,
              private fb: FormBuilder) {

    const now = new Date();
    this.today = this.formatDateToDatetimeLocal(now);

  }

  ngOnInit(): void {
    this.leaveRequest.getLeaveTypeList().subscribe((res: any) => {
      this.leaveTypeList = res;

    })
    this.leaveRequestForm = this.fb.group({
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      reason: [null, Validators.required],
      leaveType: [null, Validators.required]
    })
  }

  addLeaveRequest(): void {
    const leaveRequest = this.leaveRequestForm.value;
    console.log(leaveRequest)
    const selectedLeaveType = this.leaveTypeList.find((type:any) => type.id == leaveRequest.leaveType);
console.log(selectedLeaveType)
    if (!selectedLeaveType) {
      console.error('Type de congé non trouvé');
      return;
    }

    this.leaveRequestToPost = {
      employee: null,
      startDate: leaveRequest.startDate,
      endDate: leaveRequest.endDate,
      reason: leaveRequest.reason,
      status: 'pending',
      leaveType: {
        id: selectedLeaveType.id,
        type: selectedLeaveType.type,
        description: selectedLeaveType.description
      }
    };

    this.leaveRequest.addLeaveRequest(this.leaveRequestToPost).subscribe(
      (res: any) => {
        console.log(res);
      },
      (error: any) => {
        console.error('Error submitting leave request', error);
      }
    );
  }

  private formatDateToDatetimeLocal(date: Date): string {
    const pad = (num: number): string => (num < 10 ? '0' + num : num.toString());
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1); // Les mois sont de 0 à 11
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }
}
