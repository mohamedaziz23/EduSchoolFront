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

  getUserLastName(): string | null {
    return localStorage.getItem('prenom');
  }

  public getUserByUsername(username:any) {
    return this.http.get(`${'http://localhost:8082/eduSchool/user/getByUsername'}/${username}`);
  }

}
