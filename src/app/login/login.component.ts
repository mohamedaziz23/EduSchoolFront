import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private router: Router,
    private snackBar: MatSnackBar
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
        response => {
          console.log('Login successful:', response);
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role); // Store the role
          localStorage.setItem('firstname', response.firstname);  // Stocker le nom
          if (response.role === 'ENSEIGNANT') {
            this.router.navigate(['/DashboardEnseignant']);
          } else if (response.role === 'ETUDIANT') {
            this.router.navigate(['/DashboardStudent']);
          }else if (response.role === 'ADMINISTRATEUR'){
            this.router.navigate(['/Dashboard'])
          } else {
            this.router.navigate(['/Dashboard']); // Default dashboard
          }
        },
        error => {
          console.error('Login failed:', error);

          // Vérification de la structure de l'erreur
          if (error.status === 403) {
              if (error.error && error.error.message === 'Account is locked. Please try again later.') {
                  this.error = 'Account is locked. Please try again later.';
              } else if (error.error && error.error.message === 'User not approved by admin') {
                  this.error = 'L\'administrateur n\'a pas encore approuvé votre compte.';
              } else {
                  this.error = 'Login failed. Please check your credentials and try again.';
              }
          } else {
              this.error = 'Login failed. Please check your credentials and try again.';
          }

          this.snackBar.open(this.error, 'Close', { duration: 5000 });
      }
  );
    }
  }
}

