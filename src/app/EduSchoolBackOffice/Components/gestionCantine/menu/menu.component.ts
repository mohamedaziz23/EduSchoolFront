import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TableColumn } from 'src/app/EduSchoolBackOffice/Tools/TableColumn';
import { CantineService } from '../../services/cantine/cantine.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  menuFormBuilder!:FormGroup;
  menusTableColumns: TableColumn[] = [];
  repas!:any;
  menuList!: any;
  menu!:any;
  submitted =false;


  constructor(private cantineService: CantineService, private router: Router, private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.initializeColumns();
    this.cantineService.getrepas().subscribe(
      (data) => {
        console.log(data);
        this.repas = data;

      });
    this.menuFormBuilder=new FormGroup({
       date:new FormControl('',[Validators.required,Validators.minLength(2)]),
       jour:new FormControl('-- Sélectionner un jour --',[Validators.required]),
       plat:new FormControl('',[Validators.required])
    });
   }

   validateError(name: string, typeErr: string): boolean {
    return this.menuFormBuilder.get(name)!.hasError(typeErr);
  }


   initializeColumns(): void {
    this.menusTableColumns = [
      {
        name: 'Plat',
        dataKey: 'nomPlat',
        dataKeySimple: '',

        position: 'left',
        isSortable: false
      },
      {
        name: 'Jour',
        dataKey: 'jour',
        dataKeySimple: '',

        position: 'left',
        isSortable: false
      }


    ];
  }

  editerMenu(menu : any){
    this.router.navigate(['Dashboard/update-menu'], { state: { myData: menu } });
  }


  deleteMenu(classe : any){
   /*  this.cantineService.deleteclasse(classe.id).subscribe(
      (data) =>{
        this.classes = this.classes.filter((item: { id: any; }) => item.id !==classe.id);

      }
    ) */
  }
  addMenu(){

  }



}
