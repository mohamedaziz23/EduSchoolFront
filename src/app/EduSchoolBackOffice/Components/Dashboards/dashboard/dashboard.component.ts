import {Component, OnInit} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  isSidebarOpen = true;
  ngOnInit(): void {
  }
  badgeCount:number;

  constructor(
    private router:Router,
    ) {
        this.badgeCount=0;

     }


  logout() {
    localStorage.removeItem("connectedUser");
    this.router.navigate(['']);
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  // Fonction pour réagir à l'ouverture/fermeture de la barre latérale
  onSidebarToggle(event: any) {
    this.isSidebarOpen = event;
  }

}
