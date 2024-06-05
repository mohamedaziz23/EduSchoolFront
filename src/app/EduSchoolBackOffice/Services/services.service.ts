import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private baseURl: string = "http://localhost:8082/eduSchool/RDV";
  private baseUrl_User: string = "http://localhost:8082/eduSchool/user";

  constructor(private httpClient:HttpClient) { }

  /* ****************RDV services******************* */
  getAllRdv(): Observable<any[]>{
    return this.httpClient.get<any[]>( `${this.baseURl}/getAll` ) ;
  }
  createRdv(rdv:any): Observable<any>{
    return this.httpClient.post(`${this.baseURl}/add`, rdv )
  }
  deleteRdv(id : number):Observable<object>{
    return this.httpClient.delete(`${this.baseURl}/delete/${id}`);
  }
  getRdvByID(id : number):Observable<any>{
    return this.httpClient.get<any>(`${this.baseURl}/getById/${id}`);
  }
  getRdvByEleve(id : number):Observable<any>{
    return this.httpClient.get<any>(`${this.baseURl}/getByEleve/${id}`);
  }
  getByEnseignant(id : number):Observable<any>{
    return this.httpClient.get<any>(`${this.baseURl}/getByEnseignant/${id}`);
  }
  updateRdv( rdv:Date ,id : number):Observable<object>{
    return this.httpClient.put (`${this.baseURl}/update/${id}`,rdv);
  }
  /* ****************Eleve services******************* */
  getUserById(id:any):Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrl_User}/getById/${id}`)
  }
  getAll():Observable<any>{
    return this.httpClient.get<any[]>(`${this.baseUrl_User}/getAll`)
  }
  
}
