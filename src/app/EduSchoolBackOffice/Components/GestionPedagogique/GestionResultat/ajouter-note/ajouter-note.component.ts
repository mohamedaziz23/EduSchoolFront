import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
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
    private homeworkService:HomeworkService,
    private router :Router){
    }


    ngOnInit(): void {
      this.noteForm = new FormGroup({
        eleve: new FormControl('',Validators.required),
        noteOrale: new FormControl('', [Validators.required, noteValidator]),
        noteExamen: new FormControl('', [Validators.required, noteValidator]),
        matiere: new FormControl('',Validators.required),
        classe: new FormControl('',Validators.required)
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
      this.noteForm.get('matiere')?.valueChanges.subscribe(() => {
        this.checkAndFetchEleves();
      });
  
      this.noteForm.get('classe')?.valueChanges.subscribe(() => {
        this.checkAndFetchEleves();
      });
    }
  
    checkAndFetchEleves() {
      const matiereId = this.noteForm.get('matiere')?.value;
    const classeId = this.noteForm.get('classe')?.value;
    if (matiereId && classeId) {
      this.homeworkService.getAllEleveParClasse(matiereId,classeId).subscribe(eleves => {
        this.eleves = eleves;
      });
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
    this.homeworkService.createNote(this.noteForm.value).subscribe(
       (data)=> {
        this.router.navigate(['/Dashboard/ListNote']);
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
export function noteValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (value < 0 || value > 20) {
    return { invalidNote: true };
  }
  return null;
}