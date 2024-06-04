import { Injectable } from '@angular/core';
import { HttpClient , HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

export interface AuthenticationRequest {
  email: string;
  password: string;
}

export interface AuthenticationResponse {
  token: string;
  email: string;
  firstname:string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8082/eduSchool/v1/auth'; 

  constructor(private http: HttpClient) {}

  login(authenticationRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.baseUrl}/authenticate`, authenticationRequest).pipe(
      catchError(error => {
        if (error.status === 403 && error.error.message === 'Account is locked. Please try again later.') {
          return throwError({ status: 403, error: { message: 'Account is locked. Please try again later.' } });
        } else {
          return throwError(error);
        }
      })
    );
}

private handleError(error: HttpErrorResponse) {
  if (error.status === 403 && error.error.message === 'User not approved by admin') {
    return throwError('L\'administrateur n\'a pas encore approuvé votre compte.');
  }
  return throwError('Une erreur inconnue est survenue.');
}
  
  register(registerRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.baseUrl}/register`, registerRequest);
  }

   // Method to get the role from localStorage
   getRole(): string | null {
    return localStorage.getItem('role');
  }

  // Method to clear user data from localStorage (for logout)
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    localStorage.removeItem('nom');

  }



  
}
