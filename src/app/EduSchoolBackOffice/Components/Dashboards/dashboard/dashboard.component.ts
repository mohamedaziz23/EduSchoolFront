import {Component, OnInit} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  
  badgeCount:number;
  role: string | null = null;
  ngOnInit(): void {
  }

  constructor(
    private router:Router,
    ) {
        this.badgeCount=0;
        

     }

     navigateToUserList() {
      this.router.navigate(['/listuser']);
    }


  logout() {
    localStorage.removeItem("connectedUser");
    this.router.navigate(['']);
  }

}
