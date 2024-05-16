import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Niveau } from 'src/app/EduSchoolBackOffice/Tools/Niveau';
import Swal from 'sweetalert2';
import { SalleService } from '../../gestionPedagogique/service/salleService/salle.service';

@Component({
  selector: 'app-add-salle',
  templateUrl: './add-salle.component.html',
  styleUrls: ['./add-salle.component.css']
})
export class AddSalleComponent {


  salleForm !: FormGroup;
  salle: any = {};
  submitted = false;



  constructor(
    private salleService: SalleService,
    private route:Router
   ) {

    }

  ngOnInit(): void {
   this.salleForm=new FormGroup({
      num:new FormControl('',[Validators.required]),
      capacite:new FormControl(0,[Validators.required,Validators.pattern(/^[0-9]+$/)]),

   });
  }


  AddSalle() {
    this.submitted=true;
    if(this.salleForm.valid){
      this.salleService.createsalle(this.salleForm.value).subscribe(
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
              this.route.navigateByUrl('Dashboard/salle');
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
    return this.salleForm.get(name)!.hasError(typeErr);
  }




}
