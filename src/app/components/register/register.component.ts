import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  });

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit(): void {
    if (this.registerForm.valid) {
        const { username, password, confirmPassword } = this.registerForm.value;

        if (password !== confirmPassword) {
            console.error('Passwords do not match');
            alert('Passwords do not match');
            return;
        }

        console.log('Registration attempt:', this.registerForm.value);
        // Uncomment and use AuthService for actual registration
        // this.authService.register(this.registerForm.value).subscribe({
        //     next: () => {
        //         this.router.navigate(['/login']); // Redirect to login on success
        //     },
        //     error: (err) => {
        //         console.error('Registration failed:', err);
        //     }
        // });
    } else {
        console.error('Form is invalid');
        alert('Please fill in all required fields');
    }
  }
}
