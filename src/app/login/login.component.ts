import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../EduSchoolBackOffice/Components/services/compteService/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../EduSchoolBackOffice/Components/services/compteService/user.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  error: string | null = null;
  userCon!:any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userSer:UserService
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
        async response => {
         this.userCon= await firstValueFrom(this.userSer.getUserByUsername(response.identifiant));
          localStorage.setItem("user",JSON.stringify(this.userCon));
          console.log('Login successful:', response);
          console.log('user',localStorage.getItem('user'));
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role); // Store the role

          console.log(response);

          if (response.role === 'ENSEIGNANT') {
            this.router.navigate(['/Dashboard-enseignant']);
          } else if (response.role === 'ELEVE') {
            if(this.userCon.classe!=null){
            this.router.navigate(['/Dashboard-eleve']);
          }else  this.error = 'votre compte est en cours de préparation, faire affectation au classe avant!!!';
          }else if (response.role === 'ADMINISTRATEUR'){
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
