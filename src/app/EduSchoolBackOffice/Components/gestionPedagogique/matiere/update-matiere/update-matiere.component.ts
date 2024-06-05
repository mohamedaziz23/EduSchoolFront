import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Niveau } from 'src/app/EduSchoolBackOffice/Tools/Niveau';
import Swal from 'sweetalert2';
import { MatiereService } from '../../../services/matiereService/matiere.service';

@Component({
  selector: 'app-update-matiere',
  templateUrl: './update-matiere.component.html',
  styleUrls: ['./update-matiere.component.css']
})
export class UpdateMatiereComponent {


  matiereForm !: FormGroup;
  matiere: any = {};
  submitted = false;

  niveaux = Object.values(Niveau);
selectedNiveau: string="----selectionner niveau----";

  constructor(
    private matiereService: MatiereService,
    private route:Router
   ) {

    }

  ngOnInit(): void {
    this.matiere=window.history.state.myData;
   this.matiereForm=new FormGroup({
      nom:new FormControl(this.matiere.nom,[Validators.required,Validators.minLength(3)]),
      code:new FormControl({value:this.matiere.code,disabled: true}),
      nbHeure:new FormControl(this.matiere.nbHeure,[Validators.required,Validators.pattern(/^[0-9]+$/)]),
      ressources:new FormControl(this.matiere.ressources,[Validators.required]),
      niveau:new FormControl(this.matiere.niveau,[Validators.required])

   });
  }


  updateMatiere() {
    this.submitted=true;
    if(this.matiereForm.valid){
      this.matiereService.updatematiere(this.matiereForm.value,this.matiere.id).subscribe(
        (response: any) => {
          console.log(response);
          if (response && response.response === 'success') {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'votre données à été modifié avec success',
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              this.route.navigateByUrl('Dashboard/matiere');
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
  }

  validateError(name: string, typeErr: string): boolean {
    return this.matiereForm.get(name)!.hasError(typeErr);
  }




}
