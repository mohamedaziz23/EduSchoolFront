import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TableColumn } from 'src/app/EduSchoolBackOffice/Tools/TableColumn';
import { CantineService } from '../../gestionPedagogique/service/cantine/cantine.service';

@Component({
  selector: 'app-group-user',
  templateUrl: './group-user.component.html',
  styleUrls: ['./group-user.component.css']
})
export class GroupUserComponent {

  groupUserTableColumns: TableColumn[] = [];
  groupCantine!:any;
  groupUserList!: any;
  groupUser!:any;
  submitted =false;


  constructor(private cantineService: CantineService, private router: Router, private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.initializeColumns();
    this.cantineService.getGroupCantine().subscribe(
      (data) => {
        console.log(data);
        this.groupCantine = data;

      });

   }

   /* validateError(name: string, typeErr: string): boolean {
    return this.menuFormBuilder.get(name)!.hasError(typeErr);
  } */


   initializeColumns(): void {
    this.groupUserTableColumns = [
      {
        name: 'Identifiant',
        dataKey: 'id',
        position: 'left',
        isSortable: false
      },
      {
        name: 'Nom',
        dataKey: 'nom',
        position: 'left',
        isSortable: false
      },
      {
        name: 'Abonememnt',
        dataKey: 'abonnement',
        position: 'left',
        isSortable: false
      },
      {
        name: 'Payé',
        dataKey: 'payé',
        position: 'left',
        isSortable: false
      }


    ];
  }

  editerGroupUser(menu : any){
  //  this.router.navigate(['Dashboard/update-menu'], { state: { myData: menu } });
  }


  deleteGroupUser(classe : any){
   /*  this.cantineService.deleteclasse(classe.id).subscribe(
      (data) =>{
        this.classes = this.classes.filter((item: { id: any; }) => item.id !==classe.id);

      }
    ) */
  }
  addMenu(){

  }



}


