import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Homework } from '../../entities/homework.entitie';
import { HomeworkService } from '../services/homework.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

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
  matieres : any;
  
  constructor(private formbuilder: FormBuilder, private homeworkService:HomeworkService,private router :Router){}
 
  ngOnInit(): void {
    this.homeworkForm = this.formbuilder.group({
      sujet: ['', Validators.required],
      dateRemise: ['', Validators.required],
      dateRecu: ['', Validators.required],
      avoirDocument: [false, Validators.required], 
      niveau: ["", Validators.required], 
      document: [null, Validators.required],
      matiereHomework: [null, Validators.required]
    });
    this.homeworkService.getAllMatiere().subscribe(
      (data) => {
        this.matieres = data;
        console.log ("matieres", this.matieres)
      }
    )
  }
  get f() { return this.homeworkForm.controls; }

  AddHomework() {
  this.submitted = true;

  if (this.homeworkForm.invalid) {
    Swal.fire({
      title: 'Error!',
      text: 'il faut remplir les champs ',
      icon: 'error',
      confirmButtonText: 'ok',
      showCancelButton: true
    });
    return; // Ajoutez un retour ici pour quitter la fonction
  }

  this.homeworkService.createHomework(this.homeworkForm.value.img).subscribe(
    (data) => {
      console.log(data.message);
    }
  );

  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'votre données à été ajouté avec success',
    showConfirmButton: false,
    timer: 1500
  });
}
onFileSelected(event: any) {
  const file: File = event.target.files[0];
  console.log(file);
  this.homeworkForm.get("avoirDocument")?.setValue(true);
  console.log(this.homeworkForm.get("avoirDocument"))

  this.homeworkForm.get("document")?.setValue(file);
}

  }
  /*

  ngOnInit(): void {
    
    this.courService.getmodules().subscribe(
      (data) => {
        console.log(data.subjects);
        this.subjects = data.subjects;

        console.log(this.subjects)

      });






  }

  Addcour(c: any) {
    this.submitted = true;
    if (this.courForm.invalid) {
      return Swal.fire({
        title: 'Error!',
        text: 'if faut remplir les champs ',
        icon: 'error',
        confirmButtonText: 'ok',
        showCancelButton: true
      })

    } else {
      
      c.idEnseignant = this.connectedUser._id;

      c.type = "cours";
      c.status = "en attente"


      console.log("my cour", c);

      this.courService.createcour(c, this.courForm.value.img).subscribe(
        (data) => {

          console.log(data.message);
         
      });
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'votre données à été ajouté avec success',
        showConfirmButton: false,
        timer: 1500
      })
      c.idEnseignant = this.connectedUser._id;
      c.title = "cours ajouté par enseignant  ";
      c.date = new Date();
      c.status = "non lu";
      c.type = "notif to admin"

      this.notifications.createnotif(c).subscribe(
        (data) => {
          console.log(data.message);
      });
    }
    location.reload();

  }
  onImageSelected(event: Event) {
    //Selection du fichier
    const file = (event.target as HTMLInputElement).files[0];
    // Ajout d'un attribut img dans l'objet Chef
    this.courForm.patchValue({ img: file });
    // Mise à jour des valeurs du form
    this.courForm.updateValueAndValidity();
    // Creation d'une variable reader pour lire le contenu defichiers
    const reader = new FileReader();
    //Déclenchement du event load lors d'une lecture de fichieravec succès

    // lecture du contenu du fichier Blob ou File
    reader.readAsDataURL(file);
  }

  onSelect(subjects) {
    
  
    this.matiere = this.matieres.filter(e => e.idModule == subjects.target.value);
    console.log(this.matiere);

    










  };







*/

