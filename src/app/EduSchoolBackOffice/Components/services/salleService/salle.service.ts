import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalleService {

  SERVER_URL: string = "http://localhost:8082/eduSchool/salle";

  constructor(private httpClient: HttpClient) { }

  public createsalle(salle: any) {
    return this.httpClient.post(this.SERVER_URL + '/add', salle);
  }
  public getsalles() {
    return this.httpClient.get<{ salles: any }>(this.SERVER_URL + '/getAll');
  }

  public updatesalle(salle: any,id:any) {
    return this.httpClient.put(`${this.SERVER_URL + '/update'}/${id}`, salle)
  }
  public getsalleById(id: any) {
    return this.httpClient.get<{ salle: any }>(`${this.SERVER_URL + '/getById'}/${id}`);
  }
  public deletesalle(id: any) {
    return this.httpClient.delete(`${this.SERVER_URL + '/delete'}/${id}`)
  }
}
