import { Component, OnInit } from '@angular/core';
import { ReclamationService } from '../services/reclamationService/reclamation.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-gestion-reclamation',
  templateUrl: './gestion-reclamation.component.html',
  styleUrls: ['./gestion-reclamation.component.css']
})
export class GestionReclamationComponent implements OnInit {


  storageUser!:any;
  user!:any;

  reclamations: any[] = []; // Tableau des réclamations
newReclamation = { // Nouvelle réclamation à ajouter
    dateSoumission: '',
    titre: '',
    description: '',
    typeReclamation: '',
    iden:''
  };

  constructor(private reclamationService:ReclamationService,private dataPipe:DatePipe) {}
  ngOnInit(): void {
    this.storageUser=localStorage.getItem('user');
    this.user=JSON.parse(this.storageUser);
    this.newReclamation.iden=this.user.identifiant;
    this.loadReclamations();
  }

  loadReclamations() {
    this.reclamationService.getAll().subscribe(
      (data: any) => {
        this.reclamations = data;
        console.log("user",this.reclamations);
      },
      (error) => {
        console.log(error);
      }
    );
  }



  addNewReclamation() {
    this.reclamationService.add(this.newReclamation).subscribe(
      () => {
        console.log('Reclamation added successfully.');
        location.reload();

        this.clearNewReclamationFields();

      },
      (error) => {
        console.log(error);
      }
    );
  }

  clearNewReclamationFields() {
    this.newReclamation = {
      dateSoumission: '',
      titre: '',
      description: '',
      typeReclamation: '',
      iden:'' // Réinitialiser la sélection par défaut
    };
  }



  // Fonction pour annuler une réclamation
  cancelReclamation(reclamation: any): void {
    this.reclamationService.delete(reclamation.id).subscribe(()=>{
      console.log("succ");location.reload();

    });
  }
  accepter(rec: any) {
    this.reclamationService.updateStatus(rec.id,"APPROUVÉ").subscribe(()=>location.reload());
    }
    rejete(rec: any) {
      this.reclamationService.updateStatus(rec.id,"REFUSÉ").subscribe(()=>location.reload());


    }
}
