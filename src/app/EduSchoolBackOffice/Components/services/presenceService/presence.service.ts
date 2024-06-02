import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  SERVER_URL: string = "http://localhost:8082/eduSchool"
  constructor(private http:HttpClient) { }

  public  getStudentByClass(idClass:any){
    return this.http.get<any>(`${this.SERVER_URL + `/classe/getElevesList/${idClass}`}`)
  }

  public  getAllClass(){
    return this.http.get<any>(`${this.SERVER_URL + '/classe/getAll'}`)
  }

  public  getAllMatiere(){
    return this.http.get<any>(`${this.SERVER_URL + '/matiere/getAll'}`)
  }
}
