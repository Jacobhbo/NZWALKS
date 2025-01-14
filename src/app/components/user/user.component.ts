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
  postalCodes: any[] = [];

  userForm: FormGroup = new FormGroup({
    userId: new FormControl(),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    postalCodeId: new FormControl('', [Validators.required, Validators.min(1)])
  });

  constructor(private service: UserService) {}

  ngOnInit() {
    this.loadPostalCodes();
    this.loadUsers();
  }

  loadPostalCodes() {
    this.service.getPostalCodes().subscribe({
      next: (data) => {
        this.postalCodes = data;
        this.loadUsers();
      },
      error: (error) => console.error('Error loading postal codes:', error)
    });
  }

  getPostalCodeName(postalCodeId: number): string {
    const postalCode = this.postalCodes.find(p => p.postalCodeId === postalCodeId);
    return postalCode ? postalCode.name : postalCodeId.toString();
  }

  private loadUsers(): void {
    this.service.getall3().subscribe({
      next: (data) => {
        console.log('Users loaded:', data);
        this.userList = data;
      },
      error: (error) => console.error('Error loading users:', error)
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
          this.loadUsers();
          this.userForm.reset();
        },
        error: (err) => {
          console.error('Error adding user:', err);
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