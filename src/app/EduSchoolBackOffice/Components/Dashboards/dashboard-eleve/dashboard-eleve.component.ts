import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/compteService/auth.service';
@Component({
  selector: 'app-dashboard-eleve',
  templateUrl: './dashboard-eleve.component.html',
  styleUrls: ['./dashboard-eleve.component.css']
})
export class DashboardEleveComponent  implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  connectedUser:any;
  title:any;
  id:any;
  notification:any;
  badgeCount:number;
  mynotification:any=[];
  StorageUser!:any;
  user!:any;
  connected=false;

  constructor(
    private router:Router,
    private authSevice:AuthService
    ) {

      this.badgeCount=0;
     }

  ngOnInit(): void {
    this.StorageUser=localStorage.getItem('user');
     this.user=JSON.parse(this.StorageUser);
     localStorage.setItem('classe',JSON.stringify(this.user.classe));
     console.log("user",this.user);

  }


  ngAfterViewInit() {


    this.connectedUser = JSON.parse(localStorage.getItem("connectedUser")|| "[]");





  }

  logout() {
    this.authSevice.logout();
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
