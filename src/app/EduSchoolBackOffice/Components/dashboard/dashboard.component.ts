import {Component, OnInit} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  isSidebarOpen = true;
  ngOnInit(): void {
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  // Fonction pour réagir à l'ouverture/fermeture de la barre latérale
  onSidebarToggle(event: any) {
    this.isSidebarOpen = event;
  }

}
