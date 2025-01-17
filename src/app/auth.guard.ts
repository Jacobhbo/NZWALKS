import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      console.log('Access granted');
      return true; // Allow access
    } else {
      console.log('Access denied, redirecting to login');
      this.router.navigate(['/login']); // Redirect to login if not authenticated
      return false;
    }
  }
}