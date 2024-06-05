import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  email: string;
  nom: string;
  prenom: string;
  role: string;
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
  getUser(): any | null {
    return {
      token: localStorage.getItem('token'),
      role: localStorage.getItem('role'),
      email: localStorage.getItem('email'),
      id: localStorage.getItem('id')
    };
  }
  getUserLastName(): string | null {
    return localStorage.getItem('prenom');
  }

}
