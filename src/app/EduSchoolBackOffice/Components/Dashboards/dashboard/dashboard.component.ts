import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  badgeCount: number;
  role: string | null = null;

  constructor(private router: Router) {
    this.badgeCount = 0;
  }

  ngOnInit(): void {
  }

  navigateToUserList() {
    this.router.navigate(['/listuser']);
  }



  logout() {
    localStorage.removeItem("connectedUser");
    this.router.navigate(['']);
  }
}
