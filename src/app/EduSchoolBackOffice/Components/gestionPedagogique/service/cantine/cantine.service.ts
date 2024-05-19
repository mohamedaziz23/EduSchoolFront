import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CantineService {
  SERVER_URL: string = "http://localhost:8082/eduSchool/cantine";

  constructor(private httpClient: HttpClient) { }

  public createrepas(repas: any) {
    return this.httpClient.post(this.SERVER_URL + '/repas/add', repas);
  }
  public getrepas() {
    return this.httpClient.get<{ repass: any }>(this.SERVER_URL + '/repas/getAll');
  }

  public updaterepas(repas: any,id:any) {
    return this.httpClient.put(`${this.SERVER_URL + '/repas/update'}/${id}`, repas)
  }
  public getrepasById(id: any) {
    return this.httpClient.get<{ repas: any }>(`${this.SERVER_URL + '/repas/getById'}/${id}`);
  }
  public deleterepas(id: any) {
    return this.httpClient.delete(`${this.SERVER_URL + '/repas/delete'}/${id}`)
  }
  public createGroupCantine(repas: any) {
    return this.httpClient.post(this.SERVER_URL + '/groupCantine/add', repas);
  }
  public getGroupCantine() {
    return this.httpClient.get<{ repass: any }>(this.SERVER_URL + '/groupCantine/getAll');
  }

  public updateGroupCantine(repas: any,id:any) {
    return this.httpClient.put(`${this.SERVER_URL + '/groupCantine/update'}/${id}`, repas)
  }
  public getGroupCantineById(id: any) {
    return this.httpClient.get<{ repas: any }>(`${this.SERVER_URL + '/groupCantine/getById'}/${id}`);
  }
  public deleteGroupCantine(id: any) {
    return this.httpClient.delete(`${this.SERVER_URL + '/groupCantine/delete'}/${id}`)
  }
  public getUserCantine() {
    return this.httpClient.get<{ repass: any }>(this.SERVER_URL + '/groupCantine/getAllUser');
  }
}
