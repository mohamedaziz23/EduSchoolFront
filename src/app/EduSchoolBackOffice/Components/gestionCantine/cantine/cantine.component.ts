import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cantine',
  templateUrl: './cantine.component.html',
  styleUrls: ['./cantine.component.css']
})
export class CantineComponent {

  constructor (
    private router:Router,
    private route:ActivatedRoute
  ){}



}
