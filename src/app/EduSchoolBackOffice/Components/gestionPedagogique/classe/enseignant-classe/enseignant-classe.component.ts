import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TableColumn } from 'src/app/EduSchoolBackOffice/Tools/TableColumn';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { firstValueFrom, throwError } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClasseServiceService } from '../../../services/ClasseService/classe-service.service';
import { MatiereService } from '../../../services/matiereService/matiere.service';

@Component({
  selector: 'app-enseignant-classe',
  templateUrl: './enseignant-classe.component.html',
  styleUrls: ['./enseignant-classe.component.css']
})
export class EnseignantClasseComponent {


  enseignantsClasse: any;
  enseignantsClasseList: any;
  storageClasse: any;
  classe: any;
  matPaginator!: MatPaginator;
  paginationSizes: number[] = [5, 10, 15];
  defaultPageSize = this.paginationSizes[5];
  clEnsForm !: FormGroup;
  clEns: any = {};
  submitted = false;
  matieres!: any;
  enseignant!: any;
  matiere!: any;
  affecterObj: any = {};
  role!:any;


  constructor(
    private classeService: ClasseServiceService,
    private matiereService: MatiereService,
    private activatedroute: ActivatedRoute,
    private router: Router,
  ) { }




  ngOnInit(): void {
    this.role=localStorage.getItem('role');
    this.storageClasse = localStorage.getItem('classe');
    this.classe = JSON.parse(this.storageClasse);
    console.log(this.classe.id);
    this.classeService.getAllEnseignantClasses(this.classe.id).subscribe(
      (data) => {
        this.enseignantsClasseList = data;
        console.log(this.enseignantsClasseList);

      });
    this.clEnsForm = new FormGroup({
      idEns: new FormControl('', [Validators.required]),
      matiere: new FormControl('-- Sélectionner une matiere --', [Validators.required]),
    });
    console.log(this.classe);

    this.matiereService.getmatiereByNiveau(this.classe.niveau).subscribe(
      (response: any) => {
        this.matieres = response
      }
    )
    console.log(this.matieres);

  }


  deleteRow(element: any) {
    console.log(element);
    Swal.fire({
      position: 'center',
      icon: 'question',
      title: "Etes-vous sûr de vouloir le supprimer ?",
      showCancelButton: true,
      confirmButtonText: 'OUI',
      cancelButtonText: 'NON'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(element.enseignant.id);
        this.classeService.desaffecterEnseignant(this.classe.id, element.enseignant.id).subscribe(
          (data) => {
            console.log("succ")
            this.enseignantsClasseList = this.enseignantsClasseList.filter((item: { id: any; }) => item.id !== element.id);

          }
        );
      }
    });
  }


  editRow(_t63: any) {
    throw new Error('Method not implemented.');
  }

  async affecterEns() {
    this.submitted = true;
    try {
      this.enseignant = await firstValueFrom(this.classeService.getUserByUsername(this.clEnsForm.get('idEns')?.value));
      this.matiere = await firstValueFrom(this.matiereService.getmatiereByNomAndNiveau(this.clEnsForm.get('matiere')?.value, this.classe.niveau));

      console.log("ens", this.enseignant);
      console.log("mat", this.matiere);

      this.affecterObj = {
        idClasse: this.classe.id,
        idEnseignant: this.enseignant.id,
        idMatiere: this.matiere.id
      };
      console.log("request", this.affecterObj);

      if (this.affecterObj != null) {
        this.classeService.affecterEnseignant(this.affecterObj).subscribe(
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
                this.classeService.getAllEnseignantClasses(this.classe.id).subscribe(
                  (data) => {
                    this.enseignantsClasseList = data;
                    console.log(this.enseignantsClasseList);

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
    return this.clEnsForm.get(name)!.hasError(typeErr);
  }



}

