import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Homework } from '../../entities/homework.entitie';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { HomeworkService } from '../../services/homework.service';

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
  classes: any;
  matieres : any;
  constructor(
    private formbuilder: FormBuilder, 
    private homeworkService:HomeworkService,
    private router :Router){
    }
  ngOnInit(): void {
    this.homeworkForm = new FormGroup({
      sujet: new FormControl('',Validators.required),
      dateRemise: new FormControl('',Validators.required),
      dateRecu: new FormControl('',Validators.required),
      classeHomework: new FormControl('',Validators.required),
      description: new FormControl(''),
      matiereHomework: new FormControl('',Validators.required)
    });
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

  AddHomework() {
  this.submitted = true;
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

  