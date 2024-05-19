import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ClasseServiceService } from '../../service/ClasseService/classe-service.service';
import { Niveau } from 'src/app/EduSchoolBackOffice/Tools/Niveau';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-classe',
  templateUrl: './add-classe.component.html',
  styleUrls: ['./add-classe.component.css']
})
export class AddClasseComponent {
  niveaux = Object.keys(Niveau).filter((key: any) => !isNaN(Number(Niveau[key])));


  classeForm !: FormGroup;
  classe: any = {};
  submitted = false;

  constructor(
    private classeService: ClasseServiceService,
    private route:Router
  ) {}

  ngOnInit(): void {
    this.classeForm = new FormGroup({
      nom: new FormControl('', [Validators.required, Validators.minLength(2)]),
      niveau: new FormControl('-- Sélectionner un niveau --', [Validators.required])
    });
  }

  AddClasse() {
    this.submitted=true;
    if(this.classeForm.valid){
      this.classeService.createclasse(this.classeForm.value).subscribe(
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
