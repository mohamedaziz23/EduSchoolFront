import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TableColumn } from 'src/app/EduSchoolBackOffice/Tools/TableColumn';
import { CantineService } from '../../services/cantineService/cantine.service';
import Swal from 'sweetalert2';
import { an } from '@fullcalendar/core/internal-common';
import { firstValueFrom } from 'rxjs';

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
  user!:any;
  submitted =false;
  souscripteursEnAttente:any = [];

  souscripteursAcceptes:any = [];


  constructor(private cantineService: CantineService, private router: Router, private formBuilder: FormBuilder) { }


  async ngOnInit(): Promise<void> {
    this.initializeColumns();
    this.cantineService.getGroupCantine().subscribe(
      (data) => {
        console.log(data);
        this.groupCantine = data;

      });
     this.groupUserList=await firstValueFrom(this.cantineService.getUserCantine())
    this.souscripteursEnAttente=this.groupUserList.filter((item:any) => item.accepted ==false);
    this.souscripteursAcceptes=this.groupUserList.filter((item:any) => item.accepted ==true);
    console.log("attebt:",this.souscripteursEnAttente);
    console.log("acceoted",this.souscripteursAcceptes);


   }

   /* validateError(name: string, typeErr: string): boolean {
    return this.menuFormBuilder.get(name)!.hasError(typeErr);
  } */


   initializeColumns(): void {
    this.groupUserTableColumns = [
      {
        name: 'Identifiant',
        dataKey: 'user',
        dataKeySimple: 'identifiant',
        position: 'left',
        isSortable: false
      },
      {
        name: 'Nom',
        dataKey: 'user',
        dataKeySimple: 'nom',
        position: 'left',
        isSortable: false
      },
      {
        name: 'Abonememnt',
        dataKey: 'abonnement',
        dataKeySimple: '',
        position: 'left',
        isSortable: false
      },
      {
        name: 'Payment',
        dataKey: 'payment',
        dataKeySimple: '',
        position: 'left',
        isSortable: false
      }


    ];
  }

  editerGroupCantine(){
    if(this.groupCantine!=null){

    }
    else{
      Swal.fire({
        title: 'Ajouter responsable de la cantine',
        html: `
          <input type="text" id="nomResponsable"  class="form-control" placeholder="nom responsable">
          <div style="text-align: left; margin-top: 10px;">
          <input type="text" id="telephone"  class="form-control" placeholder="telephone">
          </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Ajouter',
        confirmButtonColor:'#06BBCC',
        preConfirm: () => {
          const nomResponsable = (document.getElementById('nomResponsable') as HTMLInputElement).value;
          const telephone = (document.getElementById('telephone') as HTMLSelectElement).value;

          if (!nomResponsable) {
            Swal.showValidationMessage('Veuillez entrer le nom du responsable');
            return null;
          }

          if (!telephone) {
            Swal.showValidationMessage('Veuillez sélectionner  telephone du repsponsable');
            return null;
          }

          return { nomResponsable, telephone };
        }
      }).then((result) => {
        if (result.isConfirmed && result.value) {
          const { nomResponsable, telephone } = result.value;
          this.cantineService.createGroupCantine({ nomResponsable, telephone }).subscribe((data:any)=>{
            console.log(data);
            location.reload();
          });
        }
      });

    }

  }

  editerGroupUser(user : any){
  }
  deleteUser(user : any){
    Swal.fire({
      position: 'center',
      icon: 'question',
      title: "Etes-vous sûr de vouloir le supprimer ?",
      showCancelButton: true,
      confirmButtonText: 'OUI',
      cancelButtonText: 'NON'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cantineService.removeUserCantine(this.groupCantine.id,user.id).subscribe(
          (data) =>{
              location.reload();
          }
        );
        Swal.close;
      }
    });

  }





   addUser(){
    Swal.fire({
      title: 'Ajouter nouveau souscripteur',
      html: `
        <input type="text" id="user"  class="form-control" placeholder="Identifiant">
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
        const user = (document.getElementById('user') as HTMLInputElement).value;
        const abonnement = (document.querySelector('input[name="abonnement"]:checked') as HTMLInputElement)?.value;
        const payment = (document.querySelector('input[name="payment"]:checked') as HTMLInputElement)?.value;

        if (!user) {
          Swal.showValidationMessage('Veuillez entrer l\'identifiant du souscripteur');
          return null;
        }
        if (!abonnement) {
          Swal.showValidationMessage('Veuillez sélectionner type abonement');
          return null;
        }

        if (!payment) {
          Swal.showValidationMessage('Veuillez sélectionner  payment');
          return null;
        }

        return { user, abonnement, payment };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const { user, abonnement, payment } = result.value;
        this.cantineService.addUserCantine({ user, abonnement, payment }).subscribe((data)=>{
          console.log(data);
          location.reload();
        });
      }
    });

  }

  accepterSouscripteur(souscripteur: any) {
    this.cantineService.accepterUSer(this.groupCantine.id,souscripteur.id).subscribe(
      (data:any)=>{
        console.log(data);
        location.reload();
      });
  }

  rejeterSouscripteur(souscripteur: any) {
    // Retirer le souscripteur de la liste en attente
  }



}


