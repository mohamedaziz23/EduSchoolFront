import { Niveau } from './../../../../../Tools/Niveau';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ClasseServiceService } from '../../../service/ClasseService/classe-service.service';
import { MatiereService } from '../../../service/matiereService/matiere.service';
import { Observable, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-affecter-enseignant',
  templateUrl: './affecter-enseignant.component.html',
  styleUrls: ['./affecter-enseignant.component.css']
})
export class AffecterEnseignantComponent {


  clEnsForm !: FormGroup;
  clEns: any = {};
  submitted = false;
  matieres!:any;
  classe!:any;
  enseignant!:any;
  matiere!:any;
  affecterObj:any={};

  constructor(
    private classeService: ClasseServiceService,
    private matiereService: MatiereService,
    private route:Router
  ) {

  }

  ngOnInit(): void {
    this.classe = window.history.state.myData;
    this.clEnsForm = new FormGroup({
      idEns: new FormControl('', [Validators.required]),
      matiere: new FormControl('-- Sélectionner une matiere --', [Validators.required]),
    });
    console.log(this.classe);

    this.matiereService.getmatiereByNiveau(this.classe.niveau).subscribe(
      (response: any) => {
        this.matieres=response
      }
    )
    console.log(this.matieres);
  }

 async affecterEns()  {
    this.submitted=true;
    try {
    this.enseignant = await firstValueFrom(this.classeService.getUserByUsername(this.clEnsForm.get('idEns')?.value));
    this.matiere = await firstValueFrom(this.matiereService.getmatiereByNomAndNiveau(this.clEnsForm.get('matiere')?.value, this.classe.niveau));

    console.log("ens",this.enseignant);
    console.log("mat",this.matiere);

    this.affecterObj = {
      idClasse: this.classe.id,
      idEnseignant: this.enseignant.id,
      idMatiere: this.matiere.id
    };
    console.log(this.affecterObj);

    if(this.affecterObj!=null){
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
              this.route.navigate(['../Dashboard/enseignant-classe'],{state: { myData: this.classe }});

            });
          }
          else{
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


