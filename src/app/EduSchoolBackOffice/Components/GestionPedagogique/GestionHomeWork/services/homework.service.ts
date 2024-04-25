import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Homework } from '../../entities/homework.entitie';
import { Matiere } from '../../entities/matiere.entitie';

@Injectable({
  providedIn: 'root'
})
export class HomeworkService {
  private baseURl: string = "http://localhost:8082/eduSchool/homework";
  private baseURl_Matiere: string = "http://localhost:8082/eduSchool/matiere";
  constructor( private httpClient:HttpClient) { }
 
  getHomework(): Observable<Homework[]>{
    console.log("ok")
     return this.httpClient.get<Homework[]>( this.baseURl) ;
  }
  createHomework(homework:Homework): Observable<any>{
    console.log("createFAilure");
    return this.httpClient.post(`${this.baseURl}/ajoute_homework`, homework )
  }
  deleteHomework(id : number):Observable<object>{
    
    return this.httpClient.delete(`${this.baseURl}/${id}`);
  }
  getHomeworkByID(id : number):Observable<Homework>{
    
    return this.httpClient.get<Homework>(`${this.baseURl}/${id}`);
  }
 
  updateHomework(id : number, homework:Homework):Observable<object>{
    
    return this.httpClient.put (`${this.baseURl}/${id}`,homework);
  }
  getAllMatiere():Observable<Matiere[]>{
    console.log("get matieres")
    return this.httpClient.get<Matiere[]>(`${this.baseURl_Matiere}/getAll`);
  }

}
