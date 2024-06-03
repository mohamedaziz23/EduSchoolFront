import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onLogin() {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      this.authService.login({ email, password }).subscribe(
        (response:any) => {
          console.log('Login successful:', response);
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          localStorage.setItem('nom', response.nom);
          localStorage.setItem('prenom', response.prenom);
          localStorage.setItem('id', response.id);// Store the role
          if (response.role === 'ENSEIGNANT') {
            this.router.navigate(['/DashboardEnseignant']);
          } else if (response.role === 'ELEVE') {
            this.router.navigate(['/DashboardStudent']);
          }else if (response.role === 'ADMIN'){
            this.router.navigate(['/Dashboard'])
          } else {
            this.router.navigate(['/Dashboard']); // Default dashboard
          }
        },
        error => {
          console.error('Login failed:', error);
          this.error = 'Login failed. Please check your credentials and try again.';
        }
      );
    }
  }
}
