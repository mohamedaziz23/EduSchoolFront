import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Note } from '../../entities/note.entitie';
import { HomeworkService } from '../../services/homework.service';

@Component({
  selector: 'app-modifier-note',
  templateUrl: './modifier-note.component.html',
  styleUrls: ['./modifier-note.component.css']
})
export class ModifierNoteComponent implements OnInit{
  eleves: any;
  classes: any;
  matieres : any;
  tousLesNotes : any;
  note : Note = new Note();
  noteForm !:FormGroup;
  submitted = false;
  id!: number ;
  constructor(
    private homeworkService:HomeworkService,
    private route: ActivatedRoute){
    }

    ngOnInit(): void {
      this.id = this.route.snapshot.params['id']; 
      this.noteForm = new FormGroup({
        noteOrale : new FormControl('', Validators.required),
        noteExamen : new FormControl('', Validators.required),
        matiereNote : new FormControl('', Validators.required)
    });

    this.homeworkService.getNoteByID(this.id).subscribe(
        (data) => { 
            this.note = data;
            if (this.note) {
                this.noteForm.patchValue({
                    matiereNote : this.note.matiereNote.nom,
                    noteOrale : this.note.noteOrale,
                    noteExamen : this.note.noteExamen
                });
            }
        }
    );
    
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
            this.classes = data;        
        }
      );
     
    }
    onClasseChange(event: Event) {
      const classeId = (event.target as HTMLSelectElement).value;
      if (classeId) {
        /* this.homeworkService.getAllEleveParClasse(classeId).subscribe(
          (eleves) => {
            
            this.eleves = eleves;
          }
        ); */
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
    console.log(this.noteForm.value)
    this.homeworkService.updateNOte(this.id,this.noteForm.value).subscribe(
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
