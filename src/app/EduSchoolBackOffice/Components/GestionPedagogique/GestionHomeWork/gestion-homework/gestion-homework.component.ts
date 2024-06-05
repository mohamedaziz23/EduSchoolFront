import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Homework } from '../../entities/homework.entitie';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { HomeworkService } from '../../../services/homeworkService/homework.service';
import { switchMap, catchError, of, map } from 'rxjs';
import { AuthService } from '../../../services/compteService/auth.service';

@Component({
  selector: 'app-gestion-homework',
  templateUrl: './gestion-homework.component.html',
  styleUrls: ['./gestion-homework.component.css']
})
export class GestionHomeworkComponent implements OnInit {
  homeworkList : Homework[] = [];
  homework : Homework = new Homework();
  homeworkForm !:FormGroup;
  submitted = false;
  classes: any=[];
  matieres : any=[];
  user: any;
  enseignantList: any;
  constructor(
    private formbuilder: FormBuilder,
    private homeworkService:HomeworkService,
    private authService: AuthService,
    private router :Router){
    }
  ngOnInit(): void {
    this.homeworkForm = new FormGroup({
      sujet: new FormControl('',Validators.required),
      dateRemise: new FormControl('',Validators.required),
      dateRecu: new FormControl('',Validators.required),
      classeHomework: new FormControl('',Validators.required),
      description: new FormControl(''),
      matiereHomework: new FormControl('',Validators.required),
      idEnseignant:new FormControl('')
    });

    this.user = this.authService.getUser();
    if (this.user.role === "ENSEIGNANT"){
      this.loadEnseignantAndMatieres();

    }else{
      this.homeworkService.getAllMatiere().subscribe(
        (data) => {
          this.matieres = data;
        }
      )
      this.homeworkService.getAllClasse().subscribe(
        (data) => {
            this.classes = data;
        }
      );
    }

  }
  loadEnseignantAndMatieres() {
    this.homeworkService.getAllEnseignant().subscribe((data : any) => {
      if (Array.isArray(data)) {
        data.forEach((enseignant: any) => {
          if (parseInt(enseignant.idEnseignant) === parseInt(this.user.id) ) {
            this.homeworkService.getMatiereById(enseignant.idMatiere).subscribe(data=>
             { if (data) {
                this.matieres.push(data);

              }}
            )
            this.homeworkService.getClasseById(enseignant.idClasse).subscribe(data=>{console.log(data);this.classes.push(data)})
          }
        });
      }
  })
  }

  AddHomework() {
  this.submitted = true;
  this.homeworkForm.get('idEnseignant')?.setValue(this.user.id)
  if (this.homeworkForm.invalid) {
    Swal.fire({
      title: 'Error!',
      text: 'il faut remplir les champs ',
      icon: 'error',
      confirmButtonText: 'ok',
      showCancelButton: false
    });
    return;
  }
  this.homeworkService.createHomework(this.homeworkForm.value).subscribe(
    (data) => {
    }
  );

  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'votre données à été ajouté avec success',
    showConfirmButton: false,
    timer: 1500
  });
  this.router.navigate(['/Dashboard/ListHomework']);
}

}

