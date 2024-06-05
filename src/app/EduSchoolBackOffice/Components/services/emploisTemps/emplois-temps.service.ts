import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmploisTempsService {

  SERVER_URL: string = "http://localhost:8082/eduSchool/seance";

  constructor(private httpClient: HttpClient) { }

  public createseance(seance: any) {
    return this.httpClient.post(this.SERVER_URL + '/add', seance);
  }
  public getseances() {
    return this.httpClient.get<{ seances: any }>(this.SERVER_URL + '/getAll');
  }

  public updateseance(seance: any,id:any) {
    return this.httpClient.put(`${this.SERVER_URL + '/update'}/${id}`, seance)
  }
  public getseanceById(id: any) {
    return this.httpClient.get<{ seance: any }>(`${this.SERVER_URL + '/getById'}/${id}`);
  }
  public deleteseance(id: any) {
    return this.httpClient.delete(`${this.SERVER_URL + '/delete'}/${id}`)
  }
}
