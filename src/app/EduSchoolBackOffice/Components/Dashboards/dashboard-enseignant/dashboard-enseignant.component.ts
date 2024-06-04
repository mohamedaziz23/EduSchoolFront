import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-enseignant',
  templateUrl: './dashboard-enseignant.component.html',
  styleUrls: ['./dashboard-enseignant.component.css']
})
export class DashboardEnseignantComponent implements OnInit{
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  connectedUser:any;
  title:any;
  id:any;
  notification:any;
  badgeCount:number;
  mynotification:any=[];
  connected=false;
  firstname: string | null = null;

  constructor(
    private router:Router,
    ) {

      this.badgeCount=0;
     }
  ngOnInit(): void {
    this.firstname = localStorage.getItem('firstname');
    console.log(`Nom: ${this.firstname}`); // Ajoutez ceci pour déboguer


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
