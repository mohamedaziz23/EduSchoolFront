import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  SERVER_URL: string = "http://localhost:8082/eduSchool/reclamation";

  constructor(private httpClient: HttpClient) { }
  public add(reclamation: any) {
    return this.httpClient.post(this.SERVER_URL + '/add', reclamation);
  }
  public getAll() {
    return this.httpClient.get<{ reclamations: any }>(this.SERVER_URL + '/getAll');
  }

  public update(reclamation: any,id:any) {
    return this.httpClient.put(`${this.SERVER_URL + '/update'}/${id}`, reclamation)
  }
  public getById(id: any) {
    return this.httpClient.get<{ reclamation: any }>(`${this.SERVER_URL + '/getById'}/${id}`);
  }
  public delete(id: any) {
    return this.httpClient.delete(`${this.SERVER_URL + '/delete'}/${id}`)
  }

  public updateStatus(id: any,status:any) {
    return this.httpClient.put(`${this.SERVER_URL + '/update_status'}/${id}/${status}`, null)
  }
}
