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
        response => {
          console.log('Login successful:', response);
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role); // Store the role
          if (response.role === 'TEACHER') {
            this.router.navigate(['/DashboardEnseignant']);
          } else if (response.role === 'STUDENT') {
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
