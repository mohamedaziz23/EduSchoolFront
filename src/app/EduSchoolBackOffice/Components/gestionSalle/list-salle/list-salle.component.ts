import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { TableColumn } from 'src/app/EduSchoolBackOffice/Tools/TableColumn';
import { SalleService } from '../../services/salleService/salle.service';

@Component({
  selector: 'app-list-salle',
  templateUrl: './list-salle.component.html',
  styleUrls: ['./list-salle.component.css']
})
export class ListSalleComponent {

  salles: any;
  salle: any;
  sallesTableColumns: TableColumn[] = [];

  constructor(
    private salleService:SalleService,
    private activatedroute: ActivatedRoute,
    private router: Router,
   ) { }

   ngOnInit(): void {
    this.initializeColumns();
     this.salleService.getsalles().subscribe(
      (data) => {
        console.log(data);
        this.salles = data;

      });

  }
  initializeColumns(): void {
    this.sallesTableColumns = [
      {
        name: 'Num',
        dataKey: 'num',
        dataKeySimple: '',

        position: 'left',
        isSortable: true
      },
      {
        name: 'Capacite',
        dataKey: 'capacite',
        dataKeySimple: '',

        position: 'left',
        isSortable: false
      },




    ];
  }


  sortData(sortParameters: Sort) {
    const keyName = sortParameters.active;
    if(keyName==='num'){
    if (sortParameters.direction === 'asc') {
      this.salles = this.salles.sort((a: any, b: any) => a[keyName].localeCompare(b[keyName]));
    } else if (sortParameters.direction === 'desc') {
      this.salles = this.salles.sort((a: any, b: any) => b[keyName].localeCompare(a[keyName]));
    }

  }



  }

  detailS($event: any) {
   // throw new Error('Method not implemented.');
    }


  editerS(salle : any){
    this.router.navigate(['Dashboard/update-salle'], { state: { myData: salle } });
  }


  deleteS(salle : any){
    this.salleService.deletesalle(salle.id).subscribe(
      (data) =>{
        this.salles = this.salles.filter((item: { id: any; }) => item.id !==salle.id);

      }
    )
  }

}

