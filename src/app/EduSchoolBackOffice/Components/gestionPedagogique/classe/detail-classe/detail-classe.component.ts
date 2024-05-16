import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { state } from '@angular/animations';

@Component({
  selector: 'app-detail-classe',
  templateUrl: './detail-classe.component.html',
  styleUrls: ['./detail-classe.component.css']
})
export class DetailClasseComponent {
  constructor (
    private router:Router,
    private route:ActivatedRoute
  ){

  }
  ngOnInit(): void {
    console.log(window.history.state.myData);

  }

  openCardDetails(cardId: number) {
    switch (cardId) {
      case 1: this.router.navigate(['../Dashboard/enseignant-classe'],{state: { myData: window.history.state.myData }});
      break;
      case 2: this.router.navigate(['../Dashboard/eleve-classe'],{state: { myData: window.history.state.myData }});
      break;
      default: this.router.navigate(['../Dashboard/emplois-temps'],{state: { myData: window.history.state.myData }});
    }

  }

}
