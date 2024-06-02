import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { TableColumn } from 'src/app/EduSchoolBackOffice/Tools/TableColumn';
import { cl } from '@fullcalendar/core/internal-common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { ClasseServiceService } from '../../../services/ClasseService/classe-service.service';

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

  clElevForm !: FormGroup;
  submitted = false;
  eleve!: any;
  affecterObj: any = {};


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

      this.clElevForm = new FormGroup({
        idElev: new FormControl('', [Validators.required]),
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



  desafecterEleveClasse(elev : any){
    this.classeService.desaffecterEleve(this.classe.id,elev.username).subscribe(
      (data) =>{
        this.elevesClasseList = this.elevesClasseList.filter((item: { id: any; }) => item.id !==elev.id);

      }
    )
  }


  async affecterElev() {
    this.submitted = true;
    try {
      if (this.affecterObj != null) {
        this.classeService.affecterEleve(this.classe.id,this.clElevForm.get('idElev')?.value).subscribe(
          (response: any) => {
            console.log(response);
            if (response && response.response === 'success') {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'votre données à été ajouté avec success',
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                this.classeService.getAllElevetClasses(this.classe.id).subscribe(
                  (data) => {
                    this.elevesClasseList = data;
                    console.log(this.elevesClasseList);

                  });

              });
            }
            else {
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: response.response,
                confirmButtonText: 'D\'accord',
              });
            }
          });
      }
    } catch (error) {
      console.error('Erreur lors de l\'affectation:', error);
    }
  }

  validateError(name: string, typeErr: string): boolean {
    return this.clElevForm.get(name)!.hasError(typeErr);
  }

}

