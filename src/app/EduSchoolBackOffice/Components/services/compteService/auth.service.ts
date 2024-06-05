import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AuthenticationRequest {
  email: string;
  password: string;
}

export interface AuthenticationResponse {
  token: string;
  email: string;
  nom:string;
  id:string;
  prenom:string;
  role: string;
  identifiant: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8082/eduSchool/v1/auth';

  constructor(private http: HttpClient) {}

  login(authenticationRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.baseUrl}/authenticate`, authenticationRequest);
  }

   // Method to get the role from localStorage
   getRole(): string | null {
    return localStorage.getItem('role');
  }

  // Method to clear user data from localStorage (for logout)
  logout(): void {
    localStorage.clear();


  }


}
