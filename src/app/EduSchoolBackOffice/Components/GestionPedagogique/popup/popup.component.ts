import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HomeworkService } from '../../services/homeworkService/homework.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  inputdata: any;
  custdata: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref:MatDialogRef<PopupComponent>,private service: HomeworkService){

  }
  ngOnInit(): void {
    this.inputdata = this.data;
    if (this.inputdata.code>0){
      if(this.inputdata.type === "homework")
      { console.log(this.inputdata.type)
        this.service.getHomeworkByID(this.inputdata.code).subscribe(
          item =>{
            this.custdata = item;
          }
        )
      }
      if (this.inputdata.type === "resultat")
      {
        console.log(this.inputdata.type)
        this.service.getNoteByID(this.inputdata.code).subscribe(
          item => {
            this.custdata = item;

            console.log(this.custdata)
          }
        )
      }
    }
  }
  closepopup(){
    this.ref.close('closing from detail');
  }

}
