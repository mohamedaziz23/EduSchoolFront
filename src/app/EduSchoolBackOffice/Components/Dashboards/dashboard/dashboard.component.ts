import {Component, OnInit} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import {NotificationService} from "../../../Services/notification.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  isSidebarOpen = true;
  notificationRequests:any
  badgeCount:number;
  role: string | null = null;

  constructor(
    private router:Router,
    private notificationService:NotificationService
  ) {
    this.badgeCount=0;


  }

  navigateToUserList() {
    this.router.navigate(['/listuser']);
  }
  ngOnInit(): void {
    this.notificationService.leaveRequest$.subscribe((res:any)=>{
      console.log(res)
      this.notificationRequests = res;
      console.log(this.notificationRequests)
      if(this.notificationRequests){
        this.showNotification()
      }
    })
  }




  logout() {
    localStorage.removeItem("connectedUser");
    this.router.navigate(['']);
  }
  showNotification() {
    Swal.fire({
      position: "top-end",
      icon: "info",
      title: "New leave request created",
      text: `Reason: ${this.notificationRequests.reason}`,
      showConfirmButton: false,
      timer: 1500
    });
  }



}
