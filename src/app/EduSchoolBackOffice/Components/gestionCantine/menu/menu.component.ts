import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TableColumn } from 'src/app/EduSchoolBackOffice/Tools/TableColumn';
import { CantineService } from '../../services/cantineService/cantine.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs';

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
  dateNow!:any;




  constructor(private cantineService: CantineService, private router: Router, private formBuilder: FormBuilder, private dataPipe:DatePipe) { }


  async ngOnInit(): Promise<void> {

    this.menuFormBuilder=new FormGroup({
      jour:new FormControl('-- Sélectionner un jour --',[Validators.required]),
      nomPlat:new FormControl('',[Validators.required])
   });

    this.dateNow=this.getFirstDayOfCurrentWeek();

    this.initializeColumns();
      try{
        this.repas = await firstValueFrom(this.cantineService.getrepas());
        console.log("repas",this.repas);
        this.menuList=await firstValueFrom(this.cantineService.getAllMenu(this.repas.id));
        console.log("menu",this.menuList);
      }catch{

      }


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

  detailMenu(menu : any){
    this.router.navigate(['Dashboard/update-menu'], { state: { myData: menu } });
  }


  deleteMenu(classe : any){
    /*  this.cantineService.removeMenu(this.repas.id).subscribe(
      (data) =>{
        this.menuList = this.menuList.filter((item: { id: any; }) => item.id !==classe.id);

      }
    )  */
  }
  addMenu(){
    this.submitted = true;
    try {
      if (this.repas.length!=0) {
        this.cantineService.addMenu(this.repas.id,this.menuFormBuilder.value).subscribe(
          (response: any) => {
            console.log(response);
            if (response && response.response === 'success') {
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
                title: response.response,
                confirmButtonText: 'D\'accord',
              });
            }
          });
      }
      else{
        this.repas={
          date:this.dateNow,
          plats:[
            {
              nomPlat:this.menuFormBuilder.get('nomPlat')?.value,
              jour:this.menuFormBuilder.get('jour')?.value
            }
          ]
        }
        console.log(this.repas);
        this.cantineService.createrepas(this.repas).subscribe(
          (response: any) => {
            console.log(response);
            if (response && response.response === 'success') {
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
                title: response.response,
                confirmButtonText: 'D\'accord',
              });
            }
          });
      }
    } catch (error) {
      console.error('Erreur lors de l\'affectation:', error);
    }

  }

   getFirstDayOfCurrentWeek(): any {
    const currentDate = new Date();
    const firstDayOfWeek = currentDate.getDate() - currentDate.getDay() + 1; // getDay() returns 0 for Sunday, so we add 1 to get Monday
    return this.dataPipe.transform(new Date(currentDate.setDate(firstDayOfWeek)),'yyyy-MM-dd') ;
  }

}
