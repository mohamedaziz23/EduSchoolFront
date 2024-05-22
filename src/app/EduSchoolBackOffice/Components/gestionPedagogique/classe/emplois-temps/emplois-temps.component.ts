import { SeanceService } from '../../service/seanceService/seance.service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CalendarOptions, DateSelectArg } from '@fullcalendar/core';
import Swal from 'sweetalert2';
import frLocale from '@fullcalendar/core/locales/fr';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { Jour } from 'src/app/EduSchoolBackOffice/Tools/Jour';
import 'default-passive-events';
import { DatePipe } from '@angular/common';
import { Niveau } from 'src/app/EduSchoolBackOffice/Tools/Niveau';


@Component({
  selector: 'app-emplois-temps',
  templateUrl: './emplois-temps.component.html',
  styleUrls: ['./emplois-temps.component.css']

})
export class EmploisTempsComponent {



  storageClasse!: any;
  classe!: any;
  posts: any;
  addeventform!: FormGroup;
  error: any;
  event: any = {};
  events: any;
  submitted!: boolean;
  data: any=[];
  calendarOptions!: CalendarOptions
  jours = Object.values(Jour).filter((val: any) => isNaN(val));
  visible:boolean=false;
  startDateSelected!:any;
  endDateSelected!:any;


  constructor(
    private seanceService: SeanceService,
    private router: Router,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) { }


  ngOnInit(): void {
    this.storageClasse = localStorage.getItem('classe');
    this.classe=JSON.parse(this.storageClasse);
    this.getAllEvents();
    this.addeventform = new FormGroup({
      idMat: new FormControl('', [Validators.required, Validators.minLength(2)]),
      jour: new FormControl('', [Validators.required]),
      heureD: new FormControl('', [Validators.required]),
      heureF: new FormControl('', [Validators.required]),
    });
    this.initializeCalendar([]);

  }

  /*  handleDateClick(arg) {
     alert('date click! ' + arg.dateStr)
   } */

  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends // toggle the boolean!
  }


  validateError(name: string, typeErr: string): boolean {
    return this.addeventform.get(name)!.hasError(typeErr);
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


  addCour(): void {
    this.submitted = true;
    console.log(this.addeventform.value);

    // Ajoutez l'événement au tableau data
    this.data.push({
      title: this.addeventform.get('idMat')?.value,
      start: this.startDateSelected + 'T' + this.addeventform.get('heureD')?.value,
      end: this.endDateSelected + 'T' + this.addeventform.get('heureF')?.value
    });

    console.log(this.data);
    this.calendarOptions.events = [...this.data];
    // Mettez à jour les événements du calendrier
    // Utilisez l'opérateur de décomposition pour forcer le re-rendu
    console.log(this.calendarOptions.events);
    this.initializeCalendar(this.calendarOptions.events);

    // Ensuite, appelez la méthode rerenderEvents



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
  initializeCalendar(data:any) {
    this.calendarOptions = {
      initialView: 'timeGridWeek',
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin, resourceTimelinePlugin],
      selectable: true,
      locale: frLocale,
      editable:true,
      headerToolbar: {
        left: '',
        center: '',
        right: ''
      },
      slotMinTime: '8:00:00',
      slotMaxTime: '18:00:00',
      slotDuration: '00:30:00',
      weekends: true,
      height: 'auto',
      eventBackgroundColor: '#36c2cf',
      eventBorderColor: '#1e5d7a',
      firstDay: 1,
      events: data,
      select: (info) => {
        this.visible=true;
        this.startDateSelected=info.startStr;
        this.endDateSelected=info.endStr;
        this.addeventform.get('jour')?.setValue(new Date(info.startStr).toLocaleDateString('fr-FR', { weekday: 'long' }).toUpperCase());
        this.addeventform.get('heureD')?.setValue( this.datePipe.transform( info.start.getTime(), 'HH:mm'));
        this.addeventform.get('heureF')?.setValue( this.datePipe.transform( info.end.getTime(), 'HH:mm'));
      }
      /* eventClick(evetData) {
        console.log(evetData.event);
      } */

    };
  }



}




