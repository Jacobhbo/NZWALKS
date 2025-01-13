import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../service/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  providers: [UserService],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userList: User[] = [];

  userForm: FormGroup = new FormGroup({
    userId: new FormControl(),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    postalCodeId: new FormControl('', [Validators.required, Validators.min(1)])
  });

  constructor(private service: UserService) {}

  ngOnInit() {
    // Load users
    this.service.getall3().subscribe({
      next: data => this.userList = data,
      error: err => console.error('Error loading users:', err)
    });
  }

  onSubmit(): void {
    console.log('Form submitted', this.userForm.value);
    console.log('Form validity:', this.userForm.valid);
    
    if (this.userForm.valid) {
      const newUser: User = this.userForm.value;
      console.log('Attempting to add user:', newUser);
      
      this.service.addUser(newUser).subscribe({
        next: (response) => {
          console.log('User added successfully:', response);
          this.service.getall3().subscribe(data => {
            console.log('Updated user list:', data);
            this.userList = data;
          });
          this.userForm.reset();
        },
        error: (err) => {
          console.error('Error adding user:', err);
          // Add user feedback here
        },
      });
    } else {
      console.error('Form validation errors:', this.userForm.errors);
    }
  }

  JuleNisse(idToDelete: number): void {
    this.service.delete(idToDelete).subscribe({
      next: () => {
        console.log('User deleted successfully');
        this.service.getall3().subscribe(data => (this.userList = data));
      },
      error: err => console.error('Error deleting user:', err),
    });
  }
}