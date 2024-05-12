import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-ajouter-examen',
  templateUrl: './ajouter-examen.component.html',
  styleUrls: ['./ajouter-examen.component.css']
})
export class AjouterExamenComponent implements OnInit {
  connectedUser: any;
  connected = false;
  
  posts: any;
  addeventform: FormGroup | undefined;
  error: any;
  event: any = {};
  events:any;
  eventService: any;



  constructor( private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    
  
    this.connectedUser = JSON.parse(localStorage.getItem("connectedUser") || "[]");
    console.log(this.connectedUser);

    if (this.connectedUser.role === "teacher") {
      this.connected = true;


    } else if (this.connectedUser.role === "student") {
      this.connected = true;
    }

    this.getAllEvents();
    this.addeventform = this.formBuilder.group({
      title: [''],
      date: [''],
      datefin: ['']



    })
  }
  handleDateClick(arg: { dateStr: string; }) {
    alert('date click! ' + arg.dateStr)
  }
  toggleWeekends() {
    //this.calendarOptions.weekends = !this.calendarOptions.weekends // toggle the boolean!
  }
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: false,
    events: [
      { title: 'Meeting', start: new Date() }
    ]
  };

  deleteEvent(id: any) {
    //this.eventService.deleteSingleEvent(id).subscribe((data: any) => {

    //});
  }

  getAllEvents() {
    this.eventService.getAllEvents().subscribe((data: any) => {
      this.posts = data.posts;

      const self = this;
      
    });
  }


  saveEvent() {

    this.eventService.addEvent(this.event).subscribe(
      (data: { message: string; }) => {
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
      () => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Something went wrong',
          showConfirmButton: false,
          timer: 1500
        });

      });
  }

}
