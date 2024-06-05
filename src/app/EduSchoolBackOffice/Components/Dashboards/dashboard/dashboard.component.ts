import {Component, OnInit} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from '../../services/compteService/auth.service';
import Swal from "sweetalert2";
import { NotificationService } from '../../services/presenceService/notification.service';

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
    private authService:AuthService,
    private notificationService:NotificationService

    ) {
        this.badgeCount=0;
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
    this.authService.logout();
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
