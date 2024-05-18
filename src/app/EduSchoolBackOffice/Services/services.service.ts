import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private baseURl: string = "http://localhost:8082/eduSchool/RDV";
  private baseURl_Eleve: string = "http://localhost:8082/eduSchool/eleves";
  private baseURl_Enseignant: string = "http://localhost:8082/eduSchool/enseignant";


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
  updateRdv( rdv:Date ,id : number):Observable<object>{
    return this.httpClient.put (`${this.baseURl}/update/${id}`,rdv);
  }
  /* ****************Eleve services******************* */
  getAllEleve(): Observable<any[]>{
    return this.httpClient.get<any[]>( `${this.baseURl_Eleve}/getAll` ) ;
  }
  getEleveByID(id : number):Observable<any>{
    return this.httpClient.get<any>(`${this.baseURl_Eleve}/getById/${id}`);
  }
  getAllEnseignant(): Observable<any[]>{
    return this.httpClient.get<any[]>( `${this.baseURl_Enseignant}/getAll` ) ;
  }

  getEnseignantByID(id : number):Observable<any>{
    return this.httpClient.get<any>(`${this.baseURl_Enseignant}/getById/${id}`);
  }
  
}
