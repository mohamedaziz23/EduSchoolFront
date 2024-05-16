import { Component } from '@angular/core';
import { MatiereService } from '../../service/matiereService/matiere.service';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { TableColumn } from 'src/app/EduSchoolBackOffice/Tools/TableColumn';

@Component({
  selector: 'app-list-matiere',
  templateUrl: './list-matiere.component.html',
  styleUrls: ['./list-matiere.component.css']
})
export class ListMatiereComponent {
  matieres: any;
  matiere: any;
  matieresTableColumns: TableColumn[] = [];

  constructor(
    private matiereService:MatiereService,
    private activatedroute: ActivatedRoute,
    private router: Router,
   ) { }

   ngOnInit(): void {
    this.initializeColumns();
     this.matiereService.getmatieres().subscribe(
      (data) => {
        console.log(data);
        this.matieres = data;

      });

  }
  initializeColumns(): void {
    this.matieresTableColumns = [
      {
        name: 'Nom',
        dataKey: 'nom',
        dataKeySimple: '',

        position: 'left',
        isSortable: true
      },
      {
        name: 'Code',
        dataKey: 'code',
        dataKeySimple: '',
        position: 'left',
        isSortable: false
      },
      {
        name: 'Niveau',
        dataKey: 'niveau',
        dataKeySimple: '',

        position: 'left',
        isSortable: false
      },
      {
        name: 'Nombre d\'Heure',
        dataKey: 'nbHeure',
        dataKeySimple: '',

        position: 'left',
        isSortable: true
      },
      {
        name: 'Ressources',
        dataKey: 'ressources',
        dataKeySimple: '',

        position: 'left',
        isSortable: false
      },




    ];
  }


  sortData(sortParameters: Sort) {
    const keyName = sortParameters.active;
    if(keyName==='nom'){
    if (sortParameters.direction === 'asc') {
      this.matieres = this.matieres.sort((a: any, b: any) => a[keyName].localeCompare(b[keyName]));
    } else if (sortParameters.direction === 'desc') {
      this.matieres = this.matieres.sort((a: any, b: any) => b[keyName].localeCompare(a[keyName]));
    }
  }
  if(keyName==='nbHeure'){
    if (sortParameters.direction === 'asc') {
      this.matieres = this.matieres.sort((a: any, b: any) => {
          return parseInt(a[keyName], 10) - parseInt(b[keyName], 10);
      });
  } else if (sortParameters.direction === 'desc') {
      this.matieres = this.matieres.sort((a: any, b: any) => {
          return parseInt(b[keyName], 10) - parseInt(a[keyName], 10);
      });
  }
  }

  }




  editerM(matiere : any){
    this.router.navigate(['Dashboard/update-matiere'], { state: { myData: matiere } });
  }
  detailM(matiere : any){
   // this.router.navigate(['Dashboard/update-matiere'], { state: { myData: matiere } });
   alert("");
  }

  deleteM(matiere : any){
    this.matiereService.deletematiere(matiere.id).subscribe(
      (data) =>{
        this.matieres = this.matieres.filter((item: { id: any; }) => item.id !==matiere.id);

      }
    )
  }

}

