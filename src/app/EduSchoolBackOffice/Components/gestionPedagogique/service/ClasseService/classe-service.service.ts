import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClasseServiceService {
  SERVER_URL: string = "http://localhost:8082/eduSchool/classe";

  constructor(private httpClient: HttpClient) { }

  public createclasse(classe: any) {
    return this.httpClient.post(this.SERVER_URL + '/add', classe);
  }
  public getclasses() {
    return this.httpClient.get<{ classes: any }>(this.SERVER_URL + '/getAll');
  }


  public updateclasse(classe: any,id:any) {
    return this.httpClient.put(`${this.SERVER_URL + '/update'}/${id}`, classe)
  }
  public getclasseById(id: any) {
    return this.httpClient.get<{ classe: any }>(`${this.SERVER_URL + '/getById'}/${id}`);
  }
  public deleteclasse(id: any) {
    return this.httpClient.delete(`${this.SERVER_URL + '/delete'}/${id}`)
  }

  // get user b username
  public getUserByUsername(username:any) {
    return this.httpClient.get<{ classes: any }>(`${this.SERVER_URL + '/getUserByUsername'}/${username}`);
  }

  // gestion enseignant dans classe

  public affecterEnseignant(ensCl: any) {
    return this.httpClient.post(this.SERVER_URL + '/affecter_enseignant_classe', ensCl);
  }

  public getAllEnseignantClasses(id:any) {
    return this.httpClient.get<{ classes: any }>(`${this.SERVER_URL + '/get_all_enseignant_classe'}/${id}`);
  }

  public desaffecterEnseignant(idCl: any,idEns:any) {
    return this.httpClient.put(`${this.SERVER_URL + '/desaffecter_enseignant_classe'}/${idCl}/${idEns}`,null);
  }


}
