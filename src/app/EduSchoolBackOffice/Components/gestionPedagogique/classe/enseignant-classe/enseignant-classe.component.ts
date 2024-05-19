import { Component } from '@angular/core';
import { TableColumn } from 'src/app/EduSchoolBackOffice/Tools/TableColumn';
import { ClasseServiceService } from '../../service/ClasseService/classe-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-enseignant-classe',
  templateUrl: './enseignant-classe.component.html',
  styleUrls: ['./enseignant-classe.component.css']
})
export class EnseignantClasseComponent {

  classes: any;
  classe: any;
  classesEnsTableColumns: TableColumn[] = [];

  constructor(
    private classeService:ClasseServiceService,
    private activatedroute: ActivatedRoute,
    private router: Router,
   ) { }

   ngOnInit(): void {
    this.initializeColumns();
     this.classeService.getclasses().subscribe(
      (data) => {
        console.log(data);
        this.classes = data;

      });

  }
  initializeColumns(): void {
    this.classesEnsTableColumns = [
      {
        name: 'Enseignant',
        dataKey: 'enseignant',
        position: 'left',
        isSortable: true
      },
      {
        name: 'Matiére',
        dataKey: 'matiere',
        position: 'left',
        isSortable: false
      },




    ];
  }


  sortData(sortParameters: Sort) {
    const keyName = sortParameters.active;
    if (sortParameters.direction === 'asc') {
      this.classes = this.classes.sort((a: any, b: any) => a[keyName].localeCompare(b[keyName]));
    } else if (sortParameters.direction === 'desc') {
      this.classes = this.classes.sort((a: any, b: any) => b[keyName].localeCompare(a[keyName]));
    }
    else  this.classes = this.classes.sort((a: any, b: any) => a[keyName].localeCompare(b[keyName]));

  }




  editerEnsClasse(classe : any){
    this.router.navigate(['Dashboard/update-classe'], { state: { myData: classe } });
  }


  deleteEnsClasse(classe : any){
    this.classeService.deleteclasse(classe.id).subscribe(
      (data) =>{
        this.classes = this.classes.filter((item: { id: any; }) => item.id !==classe.id);

      }
    )
  }

}

