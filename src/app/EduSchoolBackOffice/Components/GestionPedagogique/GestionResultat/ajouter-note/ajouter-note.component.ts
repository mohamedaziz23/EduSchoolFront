import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeworkService } from '../../services/homework.service';
import { Note } from '../../entities/note.entitie';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-ajouter-note',
  templateUrl: './ajouter-note.component.html',
  styleUrls: ['./ajouter-note.component.css']
})
export class AjouterNoteComponent implements OnInit{
  eleves: any;
  classes: any;
  matieres : any;
  tousLesNotes: any;
  note : Note = new Note();
  noteForm !:FormGroup;
  submitted = false;

  constructor(
    private formbuilder: FormBuilder, 
    private homeworkService:HomeworkService,
    private router :Router){
    }

    ngOnInit(): void {
      this.noteForm = new FormGroup({
        eleve: new FormControl('',Validators.required),
        noteOrale: new FormControl('',Validators.required),
        noteExamen: new FormControl('',Validators.required),
        matiere: new FormControl('',Validators.required),
        classe: new FormControl('',Validators.required)
      });
      this.homeworkService.getAllMatiere().subscribe(
        (data) => {
          
          this.matieres = data;
        }
      )
     /*  this.homeworkService.getAllNote().subscribe(
        (data) => {
          console.log('tous les notes',data)
        }
      ) */
      this.homeworkService.getAllClasse().subscribe(
        (data) => {
          console.log(data)
            this.classes = data;        
        }
      );
     
    }
    onClasseChange(event: Event) {
      const classeId = (event.target as HTMLSelectElement).value;
      if (classeId) {
        this.homeworkService.getAllEleveParClasse(classeId).subscribe(
          (eleves) => {
            
            this.eleves = eleves;
            console.log(this.eleves)
          }
        );
      }
    }
    
    
  AddNote(){
    this.submitted = true;
    if (this.noteForm.invalid) {
      Swal.fire({
        title: 'Error!',
        text: 'il faut remplir les champs ',
        icon: 'error',
        confirmButtonText: 'ok',
        showCancelButton: true
      });
      return; 
    }
    console.log(this.note)
    this.homeworkService.createNote(this.note).subscribe(
       (data)=> {
        console.log(data)
      }
      )
     
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'votre données à été ajouté avec success',
      showConfirmButton: false,
      timer: 1500
    });
  }  
}
