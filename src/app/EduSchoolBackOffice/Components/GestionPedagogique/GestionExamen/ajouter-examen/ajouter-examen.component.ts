import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import Swal from 'sweetalert2';
import { HomeworkService } from '../../services/homework.service';
import frLocale from '@fullcalendar/core/locales/fr';

@Component({
  selector: 'app-ajouter-examen',
  templateUrl: './ajouter-examen.component.html',
  styleUrls: ['./ajouter-examen.component.css']
})
export class AjouterExamenComponent implements OnInit {
  plugin = [dayGridPlugin, timeGridPlugin];
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: this.plugin
  }
  matieres: any;
  classes: any;
  salles: any;
  examenForm!: FormGroup;
  examen:any;
  examens :any;
  events :any = [];
  constructor(private homeworkService:HomeworkService) { }

  ngOnInit(): void {
    this.examenForm = new FormGroup({
      examen: new FormControl('',Validators.required),
      matiere: new FormControl('',Validators.required),
      classe: new FormControl('',Validators.required),
      date: new FormControl('',Validators.required),
      salle:  new FormControl('',Validators.required)
    });
    this.homeworkService.getAllMatiere().subscribe(
      (data) => {
        this.matieres = data;
      }
    )
    this.homeworkService.getSalle().subscribe(
      (data)=>{
        this.salles =data;
      }
    )
    this.homeworkService.getAllClasse().subscribe(
      (data) => {
          this.classes = data;        
      }
    );
    this.getAllExamen();
    }
    getAllExamen(){
      this.homeworkService.getAllExamen().subscribe(
        (data)=>{
          this.examens = data;
          if (this.examens) {
            this.examens.forEach((examen: {id: any; matiere: { nom: any; }; salle: { num: any; }; dateExamen: any; classes: { nom: any; }[] }) => {
              
              const classes: string[] = examen.classes.map((classe: { nom: any; }) => classe.nom);
              const event = {
                id: examen.id,
                title: examen.matiere.nom, 
                salle: examen.salle.num, 
                date: examen.dateExamen, 
                classes: classes
              };
              console.log(event)
              this.events.push(event);
            });
          }
          this.calendarOptions = {
            headerToolbar: {
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            selectable: true,
            locale: frLocale,
            editable: true,
            slotMinTime: '08:00:00',
            slotMaxTime: '18:00:00',
            events: this.events,
            eventClick: this.handleEventClick.bind(this) 
          };
        }) 
    }
      
      handleEventClick(info: { event: any; }) {
        const event = info.event;
        const eventData = {
          title: event.title,
          Id:event.id,
          otherInfo: {
            Salle: event.extendedProps.salle,
            Classes: event.extendedProps.classes.join(', ') 
          }
        };
        Swal.fire({
          html: `
            <p><strong>Title:</strong> ${eventData.title}</p>
            <p><strong>Salle:</strong> ${eventData.otherInfo.Salle}</p>
            <p><strong>Classes:</strong> ${eventData.otherInfo.Classes}</p> `,
          icon: 'info',
          showCloseButton:true,
          showDenyButton: true,
          denyButtonText: `Supprimer`,
          showConfirmButton: false ,

        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire("Saved!", "", "success");
          } else if (result.isDenied) {
            Swal.fire({
              title: 'Confirmation',
              text: 'Êtes-vous sûr de vouloir supprimer cet examen ?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Oui',
              cancelButtonText: 'Non'
            }).then((confirmResult) => {
              if (confirmResult.isConfirmed) {
                this.deleteEvent(event);
                // Close the modal window
                Swal.fire('Deleted!', 'Examen a étè supprimer', 'success');
              } else if (confirmResult.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Annulation', "Votre examen n'est pas supprime :)", 'info');
                
              }
              this.getAllExamen();
            });
          }
        });
      }
  deleteEvent(event: any) {
    this.homeworkService.deleteExamen(event.id).subscribe((data)=> {console.log(data)})
  }
      
  handleDateClick(arg: { dateStr: string; }) {
    alert('date click! ' + arg.dateStr)
  }
  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends 
  }
  ajouterExamen(){
    if (this.examenForm.invalid) {
      Swal.fire({
        title: 'Error!',
        text: 'il faut remplir les champs ',
        icon: 'error',
        confirmButtonText: 'ok',
        showCancelButton: true
      });
      return; 
    }
    console.log(this.examenForm.value)
    this.homeworkService.createExamen(this.examenForm.value).subscribe(
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
