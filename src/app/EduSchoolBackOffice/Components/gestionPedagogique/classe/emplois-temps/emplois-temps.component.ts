import { SeanceService } from './../../service/seanceService/seance.service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/core';
import Swal from 'sweetalert2';
import frLocale from '@fullcalendar/core/locales/fr';
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';

@Component({
  selector: 'app-emplois-temps',
  templateUrl: './emplois-temps.component.html',
  styleUrls: ['./emplois-temps.component.css']
})
export class EmploisTempsComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin, resourceTimelinePlugin],
    headerToolbar: {
      right: 'timeGridWeek'
    },
    selectable: true,
    locale: frLocale,
    slotMinTime: '8:00:00',
    slotMaxTime: '18:00:00',
    slotDuration: '00:30:00', // Durée des intervalles de temps (30 minutes)
    weekends: true, // Ne pas afficher les week-ends
    height: 'auto', // Hauteur automatique du calendrier en fonction du contenu
    eventBackgroundColor: '#36c2cf', // Couleur de fond des événements
    eventBorderColor: '#1e5d7a', // Couleur de la bordure des événements
    firstDay: 1,
    events: [
      {
        title: 'Mathématiques',
        start: '2024-05-06T08:00:00',
        end: '2024-05-06T09:30:00'
      },
      { title: 'Français', start: '2024-05-05T10:00:00', end: '2024-05-05T11:30:00' },
      { title: 'Récréation', start: '2024-05-06T11:30:00', end: '2024-05-06T12:00:00' },
    ]
  };


  posts: any;
  addeventform!: FormGroup;
  error: any;
  event: any = {};
  events:any;



  constructor(private seanceService: SeanceService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.getAllEvents();
    this.addeventform = this.formBuilder.group({
      title: [''],
      date: [''],
      datefin: ['']



    })
  }
 /*  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  } */
  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends // toggle the boolean!
  }


 /*  deleteEvent(id) {
    this.seanceService.deleteSingleEvent(id).subscribe((data: any) => {

    });
  } */

  getAllEvents() {
  /*   this.seanceService.getAllSeances().subscribe((data: any) => {
      this.posts = data.posts;
      const self = this;
      this.calendarOptions = {
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        selectable: true,
        locale: frLocale,
        slotMinTime: '8:00:00',
        slotMaxTime: '20:00:00',
        editable: true,
        events:data.posts,
        eventClick(evetData) {
          if (this.connectedUser.role === "superAdmin") {
            const event_id = evetData.event._def.extendedProps._id;
            Swal.fire({
              title: 'Are you sure?',
              text: 'You won\'t be able to revert this!',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, delete it!',
              timer: 30000,
            }).then((result) => {
              if (result.value) {
                self.deleteEvent(event_id);
                Swal.fire(
                  'Deleted!',
                  'Your file has been deleted.',
                  'success'
                );
                self.getAllEvents();
              }

            }).catch(() => {
              Swal.fire('Failed!', 'There was something went wrong.');
            });

          }else{
            Swal.fire({
              title:"seule Ladminstrateur peut modifier",
              icon: 'error',
              confirmButtonText: 'ok',
              showCancelButton: true
            })

          }




        }
      };
    }); */
  }


  saveEvent() {

   /*  this.seanceService.addEvent(this.event).subscribe(
      (data) => {
        console.log(data.message);

        if (data.message === 'success') {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your Event has been added successfully',
            showConfirmButton: false,
            timer: 1500
          });
          location.reload();
        }
      },
      err => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Something went wrong',
          showConfirmButton: false,
          timer: 1500
        });

      }); */
  }

}
function ViewChild(arg0: string): (target: EmploisTempsComponent, propertyKey: "calendarComponent") => void {
  throw new Error('Function not implemented.');
}

