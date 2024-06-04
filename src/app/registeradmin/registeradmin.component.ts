import { AuthenticationRequest } from '../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registeradmin',
  templateUrl: './registeradmin.component.html',
  styleUrls: ['./registeradmin.component.css']
})
export class RegisteradminComponent {
  form: FormGroup;
  error: string | null = null;
  roles: string[] = ['ADMINISTRATEUR', 'ENSEIGNANT', 'ETUDIANT'];
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]

    });
  }

  ngOnInit(): void {}

  onRegister(): void {
    if (this.form.valid) {
      const registerRequest: AuthenticationRequest = this.form.value;
      this.authService.register(registerRequest).subscribe(
        (response) => {
          console.log('Registration successful:', response);
          this.snackBar.open('Registration successful', 'Close', {
            duration: 2000,
          });
          this.router.navigate(['/Login']); // Navigate to the dashboard or login page
        },
        (error) => {
          console.error('Registration failed:', error);
          this.error = 'Registration failed. Please try again.';
        }
      );
    }
  }


}
