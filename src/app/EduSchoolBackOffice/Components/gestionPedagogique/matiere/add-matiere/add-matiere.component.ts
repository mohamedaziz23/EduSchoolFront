import { Component } from '@angular/core';
import { MatiereService } from '../../service/matiereService/matiere.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Niveau } from 'src/app/EduSchoolBackOffice/Tools/Niveau';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-matiere',
  templateUrl: './add-matiere.component.html',
  styleUrls: ['./add-matiere.component.css']
})
export class AddMatiereComponent {


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
   this.matiereForm=new FormGroup({
      nom:new FormControl('',[Validators.required,Validators.minLength(3)]),
      nbHeure:new FormControl(0,[Validators.required,Validators.pattern(/^[0-9]+$/)]),
      ressources:new FormControl('',[Validators.required]),
      niveau:new FormControl('-- Sélectionner un niveau --',[Validators.required])

   });
  }


  AddMatiere() {
    this.submitted=true;
    if(this.matiereForm.valid){
      this.matiereService.creatematiere(this.matiereForm.value).subscribe(
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
