import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  email: string;
  nom: string;
  prenom: string;
  role: string;
  isApproved: boolean;

}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8082/eduSchool/api/users'; 
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/all`);
  }
  getUserFirstName(): string | null {
    return localStorage.getItem('nom');
  }

  getUserLastName(): string | null {
    return localStorage.getItem('prenom');
  }

  deleteUserById(idUser: any): Observable<any> {  // Method name changed
    return this.http.delete<any>(`${this.baseUrl}/delete/${idUser}`);
  }

  approveUser(idUser: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/approve/${idUser}`, {});
  }

  rejectUser(idUser: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/reject/${idUser}`);
  }

}
