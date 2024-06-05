import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CantineService } from '../../services/cantineService/cantine.service';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-menu-user',
  templateUrl: './menu-user.component.html',
  styleUrls: ['./menu-user.component.css']
})
export class MenuUserComponent implements OnInit {

  repas!:any;
  menuList!: any;
  access!:boolean;
  storageData!:any;
  user!:any;
  userCantine!:[];
  dataCan!:any;

  constructor(private cantineService: CantineService, private router: Router, private dataPipe:DatePipe) { }

  async ngOnInit(): Promise<void> {

      try{
        this.storageData=localStorage.getItem('user');
        this.user=JSON.parse(this.storageData);
        this.userCantine=await firstValueFrom(this.cantineService.getUserCantine());
        console.log("userCantine",this.userCantine);
        this.access = this.userCantine.some((u:any) => (u.user.id=== this.user.id) && u.accepted);
        console.log("acces",this.access);
        this.repas = await firstValueFrom(this.cantineService.getrepas());

        console.log("repas",this.repas);
        this.menuList=await firstValueFrom(this.cantineService.getAllMenu(this.repas.id));
        console.log("menu",this.menuList);
        this.dataCan=this.dataPipe.transform(this.repas.date,'yyyy-MM-dd');

      }catch{

      }


   }

   reserverMenu(element:any){
    Swal.fire({
      position: 'center',
      icon: 'question',
      title: "Etes-vous sûr de réservé le rapas ?",
      showCancelButton: true,
      confirmButtonText: 'OUI',
      cancelButtonText: 'NON'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cantineService.reserverMenu(this.repas.id,element.id,this.user.identifiant).subscribe((data:any)=>{
          location.reload();

      console.log(data.response);

      Swal.close;

    });

  }
});
   }

   demandeInscrit() {
    Swal.fire({
      title: 'Ajouter nouveau souscripteur',
      html: `
        <div style="text-align: left; margin-top: 10px;">
        <label class="fw-bold" >Abonnement:</label>
        <input type="radio" id="SEMESTRIEL" name="abonnement" value="SEMESTRIEL">
        <label for="oui">SEMESTRIEL</label>
        <input type="radio" id="ANNUEL" name="abonnement" value="ANNUEL">
        <label for="non">ANNUEL</label>
        </div>
        <div style="text-align: left; margin-top: 10px;">
          <div>
          <label class="fw-bold" >Payment:</label>
            <input type="radio" id="oui" name="payment" value="true">
            <label for="oui">Oui</label>
            <input type="radio" id="non" name="payment" value="false">
            <label for="non">Non</label>
          </div>

        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Ajouter',
      confirmButtonColor:'#06BBCC',
      preConfirm: () => {
        const abonnement = (document.querySelector('input[name="abonnement"]:checked') as HTMLInputElement)?.value;
        const payment = (document.querySelector('input[name="payment"]:checked') as HTMLInputElement)?.value;
        if (!abonnement) {
          Swal.showValidationMessage('Veuillez sélectionner type abonement');
          return null;
        }

        if (!payment) {
          Swal.showValidationMessage('Veuillez sélectionner  payment');
          return null;
        }

        return {abonnement, payment };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const {abonnement, payment } = result.value;
        const user = this.user.identifiant;
        console.log(user);
        this.cantineService.addUserCantine({user, abonnement, payment }).subscribe((data)=>{
          console.log(data);
          location.reload();
        });
      }
    });
    }

}
