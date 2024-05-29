import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Note } from '../../entities/note.entitie';
import { Router } from '@angular/router';
import { HomeworkService } from '../../services/homework.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../../popup/popup.component';
import { NumberInput } from '@angular/cdk/coercion';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liste-resultat',
  templateUrl: './liste-resultat.component.html',
  styleUrls: ['./liste-resultat.component.css']
})
export class ListeResultatComponent implements OnInit{
  
  eleves: any;
  classes: any;
  matieres : any;

  classe:any;
  tousLesNotes: any; 
  totalItems : any;
  note : Note = new Note();
  dataSource: any;
  currentPage = 0;
  items :any;
  displayedColumns: string[] = ["Eleve", "NoteOrale", "NoteExamen", "Action"];
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort
  pagedData: any;
  pageSize: number =5;
  constructor(
    private homeworkService:HomeworkService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private router :Router){
    }

  ngOnInit(): void {
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
    this.loadNotes();
  }
  loadNotes(){
    this.homeworkService.getAllNote().subscribe(
      (data) => {
        this.dataSource=data
        this.totalItems = this.dataSource.length;
        this.pageChanged({
          pageIndex: this.currentPage, pageSize: this.pageSize, length: this.totalItems
        });
       
      }
    )
  }
  onClassChange(selectedClass: any): void {
    this.note.classe = selectedClass.value;
    this.cdr.detectChanges(); 
    this.loadEleves();
    
  }
  onSubjectChange(selectedSubject: any): void {
    this.note.matiereNote = selectedSubject.value;
    this.cdr.detectChanges(); 
    this.loadEleves();
  }
  loadEleves(): void {
    if (this.note.matiereNote && this.note.classe) {
      this.homeworkService.getAllEleveParClasseEtMatiere(this.note.classe,this.note.matiereNote).subscribe(
        (data)=> {
          this.dataSource=data;  
          this.totalItems = this.dataSource.length;
          this.pageChanged({
            pageIndex: this.currentPage, pageSize: this.pageSize, length: this.totalItems
          });

        }
      )
    }
    
  }
  editNote(id: any) {
    // Récupérer la note par ID
    this.homeworkService.getNoteByID(id).subscribe(
      (data) => { 
        this.note = data;
        if (this.note) {
          // Mettre à jour les valeurs des champs d'entrée avec les valeurs de la note
          (document.getElementById('new-oral-note') as HTMLInputElement).value = this.note.noteOrale;
          (document.getElementById('new-exam-note') as HTMLInputElement).value = this.note.noteExamen;
        }
      }
    );
  
    // Afficher la boîte de dialogue de modification
    Swal.fire({
      title: 'Modifier les notes',
      html: `
        <div>
          <label for="new-oral-note">Note orale</label>
          <input type="number" min=0 max=20 id="new-oral-note" class="swal2-input" placeholder="Nouvelle note orale">
         </div>
         <div>
           <label for="new-exam-note">Note examen</label>
           <input type="number" min=0 max=20 id="new-exam-note" class="swal2-input" placeholder="Nouvelle note examen">
          </div>
    `,
      showCancelButton: true,
      confirmButtonText: 'Enregistrer',
      preConfirm: () => {
        const newOralNote = (document.getElementById('new-oral-note') as HTMLInputElement).value;
        const newExamNote = (document.getElementById('new-exam-note') as HTMLInputElement).value;
        if (!newOralNote || !newExamNote) {
          Swal.showValidationMessage('Veuillez entrer les deux nouvelles notes');
        }
        // Mettre à jour les valeurs de this.note avec les nouvelles valeurs
        this.note.noteOrale = newOralNote;
        this.note.noteExamen = newExamNote;
        return this.note;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Mettre à jour les notes ici en utilisant l'ID de la note et les nouvelles notes
        this.updateNotes(id);
      }
    });
  }
  
  
  
  updateNotes(id: any) {
    console.log(this.note)
    this.homeworkService.updateNOte(id, this.note).subscribe()
    this.loadNotes();
  }
  
  deleteNote(id: any) {
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer cette note ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.homeworkService.deleteNote(id).subscribe(() => {
          Swal.fire(
            'Supprimé!',
            'La note a été supprimée avec succès.',
            'success'
          );
          this.loadNotes(); // Recharger les notes après la suppression
        });
      }
    });
  }
  detailNote(id:any){
    this.openPopUp(id, 'Resultat',PopupComponent );
  }
  openPopUp(code:any, titre: any, component: any){
    var _popup = this.dialog.open(component,{
      width: '100%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        title: titre,
        code: code ,
        type: 'resultat'
      }
    });
    _popup.afterClosed().subscribe( 
      item =>
        {
          this.loadEleves();
        }
      
      )
  }
 
 ajouterNote(){
  this.router.navigate(['Dashboard/AjouterNote']);
 }

  pageChanged(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.totalItems) {
      endIndex = this.totalItems;
    }
    this.items = this.dataSource.slice(startIndex, endIndex);
  }
}
