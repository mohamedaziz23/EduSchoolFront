import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {
  SERVER_URL: string = "http://localhost:8082/eduSchool/matiere";

  constructor(private httpClient: HttpClient) { }

  public creatematiere(matiere: any) {
    return this.httpClient.post(this.SERVER_URL + '/add', matiere);
  }
  public getmatieres() {
    return this.httpClient.get<{ matieres: any }>(this.SERVER_URL + '/getAll');
  }

  public updatematiere(matiere: any,id:any) {
    return this.httpClient.put(`${this.SERVER_URL + '/update'}/${id}`, matiere)
  }
  public getmatiereById(id: any) {
    return this.httpClient.get<{ matiere: any }>(`${this.SERVER_URL + '/getById'}/${id}`);
  }
  public getmatiereByNomAndNiveau(nom: any,niveau:any) {
    return this.httpClient.get<{ matiere: any }>(`${this.SERVER_URL + '/getByNomNiveau'}/${nom}/${niveau}`);
  }
  public getmatiereByNiveau(niveau:any) {
    return this.httpClient.get<{ matiere: any }>(`${this.SERVER_URL + '/getByNiveau'}/${niveau}`);
  }
  public deletematiere(id: any) {
    return this.httpClient.delete(`${this.SERVER_URL + '/delete'}/${id}`)
  }

}
