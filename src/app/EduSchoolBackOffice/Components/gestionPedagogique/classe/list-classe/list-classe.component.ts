import { ClasseServiceService } from './../service/classe-service.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-classe',
  templateUrl: './list-classe.component.html',
  styleUrls: ['./list-classe.component.css']
})
export class ListClasseComponent {

  searchText: any;
  classes: any;


  constructor(
    private classeService:ClasseServiceService,
    private activatedroute: ActivatedRoute,
    private router: Router,
   ) { }

   ngOnInit(): void {
     this.classeService.getclasses().subscribe(
      (data) => {
        console.log(data);
        this.classes = data;
      });

  }

  editerClasse(id : any){

  }

  deleteClasse(id : any){

  }

}

