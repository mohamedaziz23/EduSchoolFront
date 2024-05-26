import { EmploisTempsService } from './../../../services/emploisTemps/emplois-temps.service';
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
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { EventDialogComponent } from 'src/app/EduSchoolBackOffice/Tools/event-dialog/event-dialog.component';


@Component({
  selector: 'app-emplois-temps',
  templateUrl: './emplois-temps.component.html',
  styleUrls: ['./emplois-temps.component.css']

})
export class EmploisTempsComponent {



  storageClasse!: any;
  classe!: any;
  addeventform!: FormGroup;
  event: any = {};
  clicked!:boolean;
  submitted!: boolean;
  events: any[] = [];
  calendarOptions!: CalendarOptions
  jours = Object.values(Jour).filter((val: any) => isNaN(val));
  visible:boolean=false;
  startDateSelected!:any;
  endDateSelected!:any;
  result!:any;
  dateNow!:any;
  btnName:string="Ajouter";
  idEvent!:any;


  constructor(
    private emploisService: EmploisTempsService,
    private router: Router,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    public dialog: MatDialog,
  ) { }


  ngOnInit(): void {
    this.dateNow=this.datePipe.transform(Date.now(),'yyyy-MM-dd');
    this.storageClasse = localStorage.getItem('classe');
    this.classe=JSON.parse(this.storageClasse);
    this.initializeCalendar();
    this.getAllEvents();
    this.addeventform = new FormGroup({
      idMat: new FormControl('', [Validators.required, Validators.minLength(2)]),
      jour: new FormControl('', [Validators.required]),
      heureD: new FormControl('', [Validators.required]),
      heureF: new FormControl('', [Validators.required]),
    });

  }






  validateError(name: string, typeErr: string): boolean {
    return this.addeventform.get(name)!.hasError(typeErr);
  }


  /*  deleteEvent(id) {
     this.seanceService.deleteSingleEvent(id).subscribe((data: any) => {

     });
   } */

  getAllEvents() {
    this.emploisService.getseances().subscribe((response: any) => {
      this.events = response.map((event: any) => ({
        id:event.id,
        codeMat:event.matiere.code,
        title: "matiere: "+event.matiere.nom +'\n salle: '+ event.classe.salle.num,
        daysOfWeek: [event.jour],
        startTime: event.heureD,
        endTime: event.heureF
      }));

      this.calendarOptions.events = this.events;
      console.log(this.events);
    });
  }


  addCour(): void {
    this.submitted = true;
    console.log(this.addeventform.value);
    this.result = {
      heureD: this.addeventform.get('heureD')?.value,
      heureF: this.addeventform.get('heureF')?.value,
      jour: this.getDayNumber( this.addeventform.get('jour')?.value),
      idMatiere:this.addeventform.get('idMat')?.value,
      idClasse:this.classe.id
    };
    console.log(this.result);
if(this.btnName==="Ajouter"){
 this.emploisService.createseance(this.result).subscribe(
       (data:any) => {
         console.log(data);
         if (data.response === 'success') {
           Swal.fire({
             position: 'center',
             icon: 'success',
             title: 'votre données à été ajouté avec success',
             showConfirmButton: false,
             timer: 1500
           }).then(() => {
            location.reload();

          });
        }
         else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: data.response,
          confirmButtonText: 'D\'accord',
        });
      }
  });
  }
  else{

    this.emploisService.updateseance(this.result,this.idEvent).subscribe(
      (data:any) => {
        console.log(data);
        if (data.response === 'success') {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'votre données à été ajouté avec success',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
           location.reload();

         });
       }
        else {
       Swal.fire({
         position: 'center',
         icon: 'error',
         title: data.response,
         confirmButtonText: 'D\'accord',
       });
     }
 });
  }
}

  initializeCalendar() {
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
      displayEventTime: false,
      displayEventEnd: false,
      events: this.events,
      select: (info) => {
        console.log("jour selected",Object.values(Jour)) ;
        this.visible=true;
        this.startDateSelected=info.startStr;
        this.endDateSelected=info.endStr;
        this.addeventform.get('jour')?.setValue(new Date(info.startStr).toLocaleDateString('fr-FR', { weekday: 'long' }).toUpperCase());
        this.addeventform.get('heureD')?.setValue( this.datePipe.transform( info.start.getTime(), 'HH:mm'));
        this.addeventform.get('heureF')?.setValue( this.datePipe.transform( info.end.getTime(), 'HH:mm'));
      },
      eventClick: this.handleEventClick.bind(this)

    };
  }

  getDayNumber(dayName: string): number | undefined {
    return Jour[dayName as keyof typeof Jour];
  }


  handleEventClick(eventData: any) {
    const dialogRef = this.dialog.open(EventDialogComponent, {
      width: '300px',
      data: {
        title: eventData.event.title,
        startTime: eventData.event.start,
        endTime: eventData.event.end
      }
    });
    this.idEvent= eventData.event._def.publicId;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.action === 'edit') {
          console.log(eventData);
          this.btnName="Modifier";
          this.visible=true;
          this.addeventform.get('jour')?.setValue(new Date(eventData.event.startStr).toLocaleDateString('fr-FR', { weekday: 'long' }).toUpperCase());
          this.addeventform.get('heureD')?.setValue( this.datePipe.transform( eventData.event.start.getTime(), 'HH:mm'));
          this.addeventform.get('heureF')?.setValue( this.datePipe.transform( eventData.event.end.getTime(), 'HH:mm'));
          this.addeventform.get('idMat')?.setValue( eventData.event._def.extendedProps.codeMat);

        }


        else if (result.action === 'delete') {
          Swal.fire({
            position: 'center',
            icon: 'question',
            title: "Etes-vous sûr de vouloir le supprimer ?",
            showCancelButton: true,
            confirmButtonText: 'OUI',
            cancelButtonText: 'NON'
          }).then((result) => {
            if (result.isConfirmed) {
              this.emploisService.deleteseance(this.idEvent).subscribe((e => {
                location.reload();
              }));
              Swal.close;
            }
          });

        }
      }
    });
  }


}




