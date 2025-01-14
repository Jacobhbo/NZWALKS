import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service'; // Import the AuthService

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Login attempt:', this.loginForm.value);
      this.authService.login(this.loginForm.value).subscribe({
        next: (token) => {
          localStorage.setItem('jwt', token); // Store the JWT token
          this.router.navigate(['/home']); // Redirect to home after login
        },
        error: (err) => {
          console.error('Login failed:', err);
        }
      });
    }
  }
}