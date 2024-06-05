import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-dashboard-eleve',
  templateUrl: './dashboard-eleve.component.html',
  styleUrls: ['./dashboard-eleve.component.css']
})
export class DashboardEleveComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  connectedUser:any;
  title:any;
  id:any;
  notification:any;
  badgeCount:number;
  mynotification:any=[];
  connected=false;

  constructor(
    private router:Router,
    ) {

      this.badgeCount=0;
     }

  ngAfterViewInit() {
    
   

    this.connectedUser = JSON.parse(localStorage.getItem("connectedUser")|| "[]");
   

    


  }

  logout() {
    localStorage.removeItem("connectedUser");
    this.router.navigate(['']);
  }

  profile(id: any) {
    this.id = this.connectedUser._id
    this.router.navigate([`profilens/${this.id}`]);

  }
  deletenotif(id: any) {


  

  }

  
  clearCount() {
    this.badgeCount = 0;
  }  

  reload(){
    location.reload();
  }
}
