import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { TableColumn } from 'src/app/EduSchoolBackOffice/Tools/TableColumn';
import { ClasseServiceService } from '../../../service/ClasseService/classe-service.service';
import { cl } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-eleve-classe',
  templateUrl: './eleve-classe.component.html',
  styleUrls: ['./eleve-classe.component.css']
})
export class EleveClasseComponent {


  eleveClasse: any;
  elevesClasseList: any;
  storageClasse: any;
  classe: any;
  elevesClasseTableColumns: TableColumn[] = [];

  constructor(
    private classeService:ClasseServiceService,
    private activatedroute: ActivatedRoute,
    private router: Router,
   ) { }

   ngOnInit(): void {
    this.storageClasse = localStorage.getItem('classe');
    this.classe=JSON.parse(this.storageClasse);
    this.initializeColumns();
     this.classeService.getAllElevetClasses(this.classe.id).subscribe(
      (data) => {
        console.log(data);
        this.elevesClasseList = data;

      });

  }
  initializeColumns(): void {
    this.elevesClasseTableColumns = [
      {
        name: 'Nom Eleve',
        dataKey: 'nom',
        dataKeySimple: '',

        position: 'left',
        isSortable: true
      },
      {
        name: 'Identifiant',
        dataKey: 'username',
        dataKeySimple: '',

        position: 'left',
        isSortable: false
      },




    ];
  }



  desafecterEleveClasse(classe : any){
    this.classeService.deleteclasse(classe.id).subscribe(
      (data) =>{
        this.elevesClasseList = this.elevesClasseList.filter((item: { id: any; }) => item.id !==classe.id);

      }
    )
  }

  goToAffecterEleve() {
    throw new Error('Method not implemented.');
    }

}

