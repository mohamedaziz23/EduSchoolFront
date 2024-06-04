import {Component, OnInit} from '@angular/core';
import {LeaveRequestService} from "../../../Services/leave-request.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {NotificationService} from "../../../Services/notification.service";

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
  userInfo:any={};
  token:any;

  constructor(private leaveRequest: LeaveRequestService,
              private fb: FormBuilder,
              private router:Router,
              private notificationService:NotificationService) {

    const now = new Date();
    this.today = this.formatDateToDatetimeLocal(now);

  }

  ngOnInit(): void {
    this.userInfo = {
      id:localStorage.getItem("id"),
      prenom:localStorage.getItem("prenom"),
      nom:localStorage.getItem("nom")
    }
    console.log(this.userInfo)
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
      employee: this.userInfo,
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
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500
        });
        this.notificationService.notifyLeaveRequest(this.leaveRequestToPost);
        this.router.navigateByUrl("DashboardEnseignant/My-request")
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
