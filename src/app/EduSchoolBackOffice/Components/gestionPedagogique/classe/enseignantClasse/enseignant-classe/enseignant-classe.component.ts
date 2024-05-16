import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TableColumn } from 'src/app/EduSchoolBackOffice/Tools/TableColumn';
import { ClasseServiceService } from '../../../service/ClasseService/classe-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { firstValueFrom, throwError } from 'rxjs';

@Component({
  selector: 'app-enseignant-classe',
  templateUrl: './enseignant-classe.component.html',
  styleUrls: ['./enseignant-classe.component.css']
})
export class EnseignantClasseComponent  {


  enseignantsClasse: any;
  enseignantsClasseList: any;
  classe: any;
   matPaginator!: MatPaginator ;
   paginationSizes: number[] = [5,10,15];
  defaultPageSize = this.paginationSizes[5];



  constructor(
    private classeService:ClasseServiceService,
    private activatedroute: ActivatedRoute,
    private router: Router,
   ) { }




   ngOnInit(): void {

    this.classe = window.history.state.myData;
     this.classeService.getAllEnseignantClasses(this.classe.id).subscribe(
      (data) => {
        this.enseignantsClasseList = data;
      console.log(this.enseignantsClasseList);

      });


  }


  deleteRow(element: any) {
    Swal.fire({
      position: 'center',
      icon: 'question',
      title: "Etes-vous sûr de vouloir le supprimer ?",
      showCancelButton: true,
      confirmButtonText: 'OUI',
      cancelButtonText: 'NON'
    }).then( (result) => {
      if (result.isConfirmed) {
        console.log(element.enseignant.id);
        this.classeService.desaffecterEnseignant(this.classe.id,element.enseignant.id).subscribe(
          (data)=>{console.log("succ")
          this.classeService.getAllEnseignantClasses(this.classe.id).subscribe();
        }
        );
      }
    });
  }


    editRow(_t63: any) {
    throw new Error('Method not implemented.');
    }

    goToAffecterClasse() {
       this.router.navigate(['../Dashboard/affecter_enseignant'],{state: { myData: this.classe }});

      }





}

