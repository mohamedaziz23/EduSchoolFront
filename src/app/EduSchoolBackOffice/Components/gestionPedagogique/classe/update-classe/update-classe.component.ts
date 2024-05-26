import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClasseServiceService } from '../../service/ClasseService/classe-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Niveau } from 'src/app/EduSchoolBackOffice/Tools/Niveau';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-classe',
  templateUrl: './update-classe.component.html',
  styleUrls: ['./update-classe.component.css']
})
export class UpdateClasseComponent {

  classeForm !: FormGroup;
  storageClasse!:any;
  classe: any = {};
  submitted = false;

  niveaux = Object.values(Niveau);
selectedNiveau: string="----selectionner niveau----";

  constructor(
    private classeService: ClasseServiceService,
    private route:Router,
   ) {
    }

  ngOnInit(): void {
    this.storageClasse=localStorage.getItem('classe');
    this.classe=JSON.parse(this.storageClasse);
    console.log(this.classe);
   this.classeForm=new FormGroup({
      nom:new FormControl(this.classe.nom,[Validators.required,Validators.minLength(2)]),
      niveau:new FormControl(this.classe.niveau,[Validators.required])

   });
  }


  updateClasse() {
    this.submitted=true;
    if(this.classeForm.valid){
      this.classeService.updateclasse(this.classeForm.value,this.classe.id).subscribe(
        (response: any) => {
          console.log(response);
          if (response && response.response === 'success') {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'votre données à été modifé avec success',
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              this.route.navigateByUrl('Dashboard/classe');
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
    return this.classeForm.get(name)!.hasError(typeErr);
  }




}
