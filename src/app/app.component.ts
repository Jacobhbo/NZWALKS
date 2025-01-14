import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Cinema';

  constructor(public router: Router, private authService: AuthService) {}


  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);

    console.log('Logged out');
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}