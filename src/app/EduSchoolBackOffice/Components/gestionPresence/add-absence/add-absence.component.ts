import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PresenceService} from "../../../Services/presence.service";

@Component({
  selector: 'app-add-absence',
  templateUrl: './add-absence.component.html',
  styleUrls: ['./add-absence.component.css']
})
export class AddAbsenceComponent implements OnInit{
  onSelect(classe:any) {
    this.presenceService.getStudentByClass(classe.target.value).subscribe((res)=>{
      this.filetredUser = res;
      console.log(this.filetredUser)
    })
    // console.log(classe.target.value)
    // this.filetredUser = this.listeleve.filter(e => e.classe.id == classe.target.value);
    // console.log(this.filetredUser);

  }

  addForm!: FormGroup;
  submitted = false;
  filetredUser:any=[];
  classes:any=[];
  matieres:any=[];
  constructor(private formbuilder:FormBuilder,
              private presenceService:PresenceService) {
  }

  ngOnInit() {
this.presenceService.getAllClass().subscribe((res)=>{
  this.classes=res;
  console.log(this.classes);
})

    this.presenceService.getAllMatiere().subscribe((res)=>{
      this.matieres=res;
    })
    this.addForm = this.formbuilder.group({
      remarque: ['', [Validators.required]],
      presence: ['', [Validators.required]],
      idMatiere: ['', [Validators.required]],
      date: ['', [Validators.required]],
      idGroupe: ['', [Validators.required]]


    })
  }

  get f() { return this.addForm.controls; }



  add() {

  }
}
