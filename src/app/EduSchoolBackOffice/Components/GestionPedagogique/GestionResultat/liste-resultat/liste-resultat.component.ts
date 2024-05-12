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

    this.homeworkService.getAllNote().subscribe(
      (data) => {
        this.dataSource=data
        console.log(this.dataSource)
        this.totalItems = this.dataSource.length;
        this.pageChanged({
          pageIndex: this.currentPage, pageSize: this.pageSize, length: this.totalItems
        });
       
      }
    )
   
    this.homeworkService.getAllClasse().subscribe(
      (data) => {
          this.classes = data;        
      }
    );
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
  editNote(id:any){
    this.router.navigate(['Dashboard/ModifierNote',id]);

  }
  deleteNote(id:any){
    this.homeworkService.deleteNote(id).subscribe(() => {
      this.loadEleves(); // Recharge les élèves après la suppression de la note
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
    console.log(this.currentPage)
    console.log(event.pageIndex)
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.totalItems) {
      endIndex = this.totalItems;
    }
    this.items = this.dataSource.slice(startIndex, endIndex);
    console.log(this.items)
  }
}
